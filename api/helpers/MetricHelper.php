<?php

class MetricHelper
{
	private $DB;
	private $teams;
	
	public function __construct(\Doctrine\DBAL\Connection $DB) {
		$this->DB = $DB;
		$this->loadTeams();
	}

	public function get() {
		$this->nginx();
		$this->apache2();
		$this->mysql_connected();
		$this->load();
		
		$this->velocity();
		$this->punkte();
		
		$this->station();
	}


	private function loadTeams() {
		$sql = "SELECT * FROM team";
		$teams = $this->DB->fetchAll($sql);

		$this->teams = array();
		foreach ($teams as $team) {
			$this->teams[$team['t_ID']] = $team;
		}
	}

	private function teamTag($t_ID) {
		return '{team_name="' . $this->teams[$t_ID]['name'] . '",team_id="' . $t_ID . '"}';
	}	

	function distance($lat1, $lon1, $lat2, $lon2) {
		
		$theta = $lon1 - $lon2;
		$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		$miles = $dist * 60 * 1.1515;
		
		return ($miles * 1.609344);
	}
	
	
	function load() {
		$load = sys_getloadavg();
		echo 'load{average="1min"} ' . $load[0] . "\n";
		echo 'load{average="5min"} ' . $load[1] . "\n";
		echo 'load{average="15min"} ' . $load[2] . "\n";
	}
	
	function nginx() {
		$res = shell_exec('ps a -C nginx');
		$procs = explode("\n", $res);
		$nginx = 0;
		foreach ($procs as $p) {
			if (strpos($p, 'nginx: worker process') !== false) {
				$nginx += 1;
			}
		}
		echo "nginx_procs " . $nginx . "\n";
	}
	
	function apache2() {
		$res = shell_exec('ps a -C apache2');
		$procs = explode("\n", $res);
		$apache = 0;
		foreach ($procs as $p) {
			if (strpos($p, '/usr/sbin/apache2') !== false) {
				$apache += 1;
			}
		}
		echo "apache2_procs " . $apache . "\n";
	}
	
	function mysql_connected() {
		$sql = "SHOW STATUS WHERE `variable_name` = 'Threads_connected'";
		$threads = $this->DB->fetchAll($sql);
		echo 'mysql_connected ' . $threads[0]['Value'] . "\n";
	}
	
	function punkte() {
		$teams = $this->DB->fetchAll("
		SELECT 
			t.*, 
			IF (trp.score IS NOT NULL, trp.score, 0) AS score,
			IF (tmrx.mrx_count IS NOT NULL, tmrx.mrx_count, 0) AS mrx_count,
			IF (trdl.riddle_count IS NOT NULL, trdl.riddle_count, 0) AS riddle_count
		FROM team t
		LEFT JOIN
			(SELECT t_ID, SUM(points) as score from r_team_points GROUP BY t_ID) as trp
			ON trp.t_ID = t.t_ID
		LEFT JOIN
			(SELECT t_ID, COUNT(x_ID) as mrx_count from r_team_mrx GROUP BY t_ID) as tmrx
			ON tmrx.t_ID = t.t_ID
		LEFT JOIN
			(SELECT t_ID, COUNT(r_ID) as riddle_count from r_team_riddle WHERE state = 'SOLVED' GROUP BY t_ID) as trdl
			ON trdl.t_ID = t.t_ID
		");
		
		// 		get station count
		$station_count = [];
		$team_stations = $this->DB->fetchAll("
			SELECT ts2.t_id as team, count(*) as stations
			FROM (
				SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
			) as ts1
			INNER JOIN r_team_station as ts2
				ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
				GROUP BY team");
		foreach ($team_stations as $row) {
			$station_count[$row['team']] = $row['stations'];
		}
		
		foreach ($teams as $index => $team) {
			
			// 			add station count
						if (isset($station_count[$team['t_ID']])) {
				$teams[$index]['station_count'] = $station_count[$team['t_ID']];
			}
			else {
				$teams[$index]['station_count'] = 0;
			}
			
			// 			add captures
						$captures = $this->DB->fetchAll("
				SELECT rts.s_ID, s.pos_lat as lat, s.pos_long as lng, UNIX_TIMESTAMP(timestamp)*1000 as timestamp
				FROM r_team_station rts
				LEFT JOIN station s ON s.s_ID = rts.s_ID
				WHERE rts.t_ID = ?
				ORDER BY rts.timestamp DESC
			", array($team['t_ID']));
			$teams[$index]['captures'] = $captures;
		}
		
		foreach ($teams as $team) {
			echo 'team_score' . $this->teamTag($team['t_ID']) . ' ' . $team['score'] . "\n";
			echo 'team_mrx' . $this->teamTag($team['t_ID']) . ' ' . $team['mrx_count'] . "\n";
			echo 'team_riddle' . $this->teamTag($team['t_ID']) . ' ' . $team['riddle_count'] . "\n";
			echo 'team_station' . $this->teamTag($team['t_ID']) . ' ' . $team['station_count'] . "\n";
			echo 'team_captures' . $this->teamTag($team['t_ID']) . ' ' . count($team['captures']) . "\n";
		}
		
		return $teams;
	}
	
	function velocity() {
		// 		get captures
		$sql = "SELECT rts.t_ID,rts.s_ID, s.pos_lat as lat, s.pos_long as lng, UNIX_TIMESTAMP(timestamp) as unixtimestamp
				FROM r_team_station rts
				LEFT JOIN station s ON s.s_ID = rts.s_ID
				ORDER BY rts.timestamp ASC";
		
		$positions = $this->DB->fetchAll($sql);
		
		$velocities = array();
		$lastpos = array();
		$distTotal = array();
		$timeTotal = array();
		
		$time15m = array();
		$dist15m = array();
		
		foreach($positions as $pos) {
			$key = $pos['t_ID'];
			if (!isset($velocities[$key])) {
				$velocities[$key] = array();
				$distTotal[$key] = 0;
				$timeTotal[$key] = 0;
				$dist15m[$key] = 0;
				$time15m[$key] = 0;
			}
			
			if (isset($lastpos[$key])) {
				$deltaTime = $pos['unixtimestamp'] - $lastpos[$key]['unixtimestamp'];
				if ($deltaTime > 0) {
					$distance = $this->distance($lastpos[$key]['lat'], $lastpos[$key]['lon'], $pos['lat'], $pos['lng']);
					if ($distance > 0) {
						$velocities[$key][] = array(
						                    'distance' => $distance,
						                    'time' => $deltaTime,
						                    'timestamp' => $pos['unixtimestamp'],
						                    'velocity' => $distance / ($deltaTime / 3600));
						$lastpos[$key] = array(
						                    'lat' => $pos['lat'],
						                    'lon' => $pos['lng'],
						                    'unixtimestamp' => $pos['unixtimestamp']
						                );
						$distTotal[$key] += $distance;
						$timeTotal[$key] += $deltaTime;
						//o						nly last ca 15min
						                if ($pos['unixtimestamp'] > time() - 15*60) {
							$dist15m[$key] += $distance;
							$time15m[$key] += $deltaTime;
						}
					}
				}
			}
			else {
				$lastpos[$key] = array(
				            'lat' => $pos['lat'],
				            'lon' => $pos['lng'],
				            'unixtimestamp' => $pos['unixtimestamp']
				        );
			}
		}
		
		foreach ($velocities as $team=>$value) {
			if ($timeTotal[$team] > 0) {
				echo 'team_dist' . $this->teamTag($team) . ' ' . $distTotal[$team] . "\n";
				echo 'team_time' . $this->teamTag($team) . ' ' . $timeTotal[$team] . "\n";
				echo 'team_velocitiy' . $this->teamTag($team) . ' ' . $distTotal[$team] / ($timeTotal[$team] / 3600) . "\n";
			}

			if ($time15m[$team] > 0) {
				echo 'team_dist15m' . $this->teamTag($team) . ' ' . $dist15m[$team] . "\n";
				echo 'team_time15m' . $this->teamTag($team) . ' ' . $time15m[$team] . "\n";
				echo 'team_velocitiy15m' . $this->teamTag($team) . ' ' . $dist15m[$team] / ($time15m[$team] / 3600) . "\n";
			}
		}
	}
	
	function station() {
		$sql = "SELECT count(*) as cnt FROM  station INNER JOIN r_team_station USING(s_ID) GROUP BY station.s_ID;";
		$stations = $this->DB->fetchAll($sql);
		echo 'station_owned ' . count($stations) . "\n";
		$sql = "SELECT count(*) as cnt FROM r_team_station";
		$stations = $this->DB->fetchAll($sql);
		echo 'station_captured ' . $stations[0]['cnt'] . "\n";
	}
}
