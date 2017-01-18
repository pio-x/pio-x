<?php

class ScoreHelper {
	/** @var \Doctrine\DBAL\Connection */
	private $DB;

	function __construct($db) {
		$this->DB = $db;
	}

	public function riddle($teamId, $riddleId, $was_wrong = false) {
		$riddle = $this->DB->fetchAssoc("SELECT * FROM riddle WHERE r_ID = ?", array($riddleId));
		if (isset($riddle['points'])) {
			$points = $riddle['points'];
			// wenn das Rätsel falsch war, halbe Punkteanzahl abziehen (abgerundet)
			if ($was_wrong) {
				$points = ceil(-0.5 * $points);
			}
			$this->addLog('RIDDLE', $teamId, $points, $riddleId);
		}
	}

	public function passcode($teamId, $passcodeId) {
		// TODO: implement
		$points = 0;
		$this->addLog('PASSCODE', $teamId, $points, $passcodeId);
	}

	public function station($teamId, $stationId) {
		$station = $this->DB->fetchAssoc("SELECT * FROM station WHERE s_ID = ?", array($stationId));
		if (isset($station['points'])) {
			$points = $station['points'];
			$this->addLog('STATION', $teamId, $points, $stationId);
		}
	}

	public function addLog($type, $teamId, $points, $fk = 0) {
		$data = array(
			't_ID' => $teamId,
			'points' => $points,
			'type' => $type,
			'FK_ID' => $fk
		);
		$this->DB->insert('r_team_points', $data);
	}
}
