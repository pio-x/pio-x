<?php
use \Slim\Http\Request as Request;
use \Slim\Http\Response as Response;
use Doctrine\DBAL\DriverManager;


require 'vendor/autoload.php';
require 'conf.php';

require 'helpers/APIHelper.php';
require 'helpers/ConfigHelper.php';
require 'helpers/LogHelper.php';
require 'helpers/ScoreHelper.php';

require 'middleware/AddHeaders.php';
require 'middleware/Authentication.php';
require 'middleware/LogPosition.php';


define('UPLOADED_IMAGE_FOLDER', 'uploaded_images/');

$DB = DriverManager::getConnection($SQL_CREDENTIALS, new \Doctrine\DBAL\Configuration());

$log = new LogHelper($DB);
$score = new ScoreHelper($DB);
$configHelper = new ConfigHelper($DB);
$config = $configHelper->getConfig();

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);


// 3. log team location
$app->add(new LogPosition($DB));

// 2. check if is authenticated (all routes) and add arguments
$app->add(new Authentication($DB));

// 1. always add CORS headers
$app->add(new AddHeaders());

// STATION
$app->get('/station',function (Request $request, Response $response) use (&$DB, $config) {
	if (!$config['game_is_running']) {
		return $response->withJson([]);
	}

	// stations with last capture info
	$sql = "
	SELECT s.*, ts2.t_id as team, ts2.timestamp as captured_timestamp FROM (
		SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
	) as ts1
	INNER JOIN r_team_station as ts2
		ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
	RIGHT JOIN station s
		ON s.s_ID = ts2.s_ID
	ORDER BY s.s_ID
";

	$stations = $DB->fetchAll($sql);
	return $response->withJson($stations, 200, JSON_NUMERIC_CHECK);
});

// images must be sent as body in data url format
$app->post('/station/{id}/capture',function (Request $request, Response $response, $args) use (&$DB, &$log, $config) {
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}

	if (!$config['game_is_running']) {
		return $response->withStatus(403)->withJson("Game is not running");
	}

	$body = (string) $request->getBody();
	if (substr($body,0,10) != 'data:image') {
		return $response->withStatus(403)->withJson("Error: no valid image data sent");
	}

	$stationId = $args['id'];
	$teamId = $request->getAttribute('team_id');

	$qsa = $request->getQueryParams();
	if (isset($qsa['tags'])) {
		$tags = json_decode($qsa['tags'], true);
	} else {
		$tags = [];
	}

	// process image
	$file = file_get_contents($body);
	$image = imagecreatefromstring($file);
	if (isset($tags['Orientation'])) {
		$or = $tags['Orientation'];
		switch ($or) {
			case 1:
				break;
			case 2:
				imageflip($image, IMG_FLIP_HORIZONTAL);
				break;
			case 3:
				$image = imagerotate($image, 180, 0);
				break;
			case 4:
				imageflip($image, IMG_FLIP_HORIZONTAL);
				$image = imagerotate($image, 180, 0);
				break;
			case 5:
				imageflip($image, IMG_FLIP_HORIZONTAL);
				$image = imagerotate($image, 90, 0);
				break;
			case 6:
				$image = imagerotate($image, 90, 0);
				break;
			case 7:
				imageflip($image, IMG_FLIP_HORIZONTAL);
				$image = imagerotate($image, 270, 0);
				break;
			case 8:
				$image = imagerotate($image, 270, 0);
				break;
		}
	}

	// save image
	$imageId = 'capture_s' . $stationId . '_t' . $teamId . '_' . round(microtime(true) * 1000);
	$filename = UPLOADED_IMAGE_FOLDER.$imageId.'.jpg';
	imagejpeg($image, $filename, 75);
	chmod($filename, 0766);

	// TODO: location check

	$data = array(
		's_ID' => $stationId,
		't_ID' => $teamId,
		'img_ID' => $imageId
	);

	$DB->insert('r_team_station', $data);
	$insertId = $DB->lastInsertId();

	$station = $DB->fetchAssoc("SELECT name FROM station WHERE s_ID = ?", array($stationId));
	$log->station('Team '.$request->getAttribute('team_name').' hat die Station '.$station['name'].' eingenommen', $insertId);

	return $response->withJson($tags);
});

$app->post('/station',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);

	$data = array('pos_lat' => $body['pos_lat'],
				'pos_long' => $body['pos_long'],
				'points' => (isset($body['points']) ? intval($body['points']) : 0 ),
				'name' => $body['name'],
				'description' => $body['description']);

	$DB->insert('station', $data);

	return $response->withJson("success");
});

$app->put('/station/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$stationId = $args['id'];
	$body = json_decode($request->getBody(), true);

	$data = array('pos_lat' => $body['pos_lat'],
			'pos_long' => $body['pos_long'],
			'points' => (isset($body['points']) ? intval($body['points']) : 0 ),
			'name' => $body['name'],
			'description' => $body['description']);

	$DB->update('station', $data, array('s_ID' => $stationId));

	return $response->withJson("success");
});

$app->delete('/station/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$deleted = $DB->delete('station', array('s_ID' => $args['id']));

	if ($deleted) {
		return $response->withJson("success");
	} else {
		return $response->withStatus(404);
	}
});


// TEAM
$app->get('/team', function (Request $request, Response $response) use (&$DB) {
	$teams = $DB->fetchAll("
		SELECT t.*, trp.score
			FROM team t
		LEFT JOIN
			(SELECT t_ID, SUM(points) as score from r_team_points GROUP BY t_ID) as trp
			ON trp.t_ID = t.t_ID
		");
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$teams = APIHelper::removeAttribute($teams, 'hash');
	}

	return $response->withJson($teams, 200, JSON_NUMERIC_CHECK);
});

$app->get('/team/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	$teamId = $args['id'];
	$team = $DB->fetchAssoc("SELECT * FROM team WHERE t_ID = ?", array($teamId));
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$team = APIHelper::removeAttribute($team, 'hash');
	}

	if($team) {
		return $response->withJson($team, 200, JSON_NUMERIC_CHECK);
	} else {
		return $response->withStatus(404)->withJson("team not found");
	}
});

$app->post('/team',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('name' => $body['name']);

	if (isset($body['hash']) && $body['hash']) {
		$data['hash'] = $body['hash'];
	} else {
		$data['hash'] = md5(time() . $body['name'] . 'PIOX' . rand());
	}

	$DB->insert('team', $data);

	return $response->withJson("success");
});
$app->put('/team/{id}', function (Request $request, Response $response, $args) use (&$DB, $config) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}
	$teamId = $args['id'];
	$body = json_decode($request->getBody(), true);

	$DB->update('team', array('name' => $body['name']), array('t_ID' => $teamId));

	return $response->withJson("success");
});


// MISTER X
$app->get('/mrx', function (Request $request, Response $response) use (&$DB, $config) {
	if (!$config['game_is_running']) {
		return $response->withJson([]);
	}

	$mrxs = $DB->fetchAll("SELECT * FROM mrx");
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$mrxs = APIHelper::removeAttribute($mrxs, 'x_hash');
	}
	$data = [];
	foreach ($mrxs as $mrx) {
		// TODO: positionen bei teams nur mitschicken wenn sie sie sehen dürfen
		// TODO: nur senden wenn noch nicht gefangen
		$locations = $DB->fetchAll("SELECT xpos_lat, xpos_long, timestamp, description FROM mrx_position WHERE mrx_ID = ? ORDER BY timestamp desc LIMIT 3", array($mrx['x_ID']));

		// nur senden wenn mind. 1 location vorhanden
		if (is_array($locations) && count($locations) > 0) {
			$mrx['locations'] = $locations;
			$data[] = $mrx;
		}
	}
	return $response->withJson($data, 200, JSON_NUMERIC_CHECK);
});

$app->post('/mrx/{id}/location', function (Request $request, Response $response, $args) use (&$DB, $config) {
	if ($request->getAttribute('is_mrx') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a mrx");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('xpos_lat' => $body['location']['lat'],
				'xpos_long' => $body['location']['lng'],
				'description' => $body['description'],
				'mrx_ID' => $args['id']);

	$DB->insert('mrx_position', $data);
	return $response->withJson($data, 200, JSON_NUMERIC_CHECK);
});


// TOM RIDDLE
$app->get('/riddle', function (Request $request, Response $response) use (&$DB, $config) {
	if (!$config['game_is_running']) {
		return $response->withJson([]);
	}
	if ($request->getAttribute('is_admin') == true) {
		$riddles = $DB->fetchAll("SELECT * FROM riddle");
		return $response->withJson($riddles, 200, JSON_NUMERIC_CHECK);
	} else {
		if ($request->getAttribute('is_team') == true) {
			$riddles = $DB->fetchAll("SELECT r.*, tr.state FROM riddle r LEFT JOIN r_team_riddle tr ON r.r_ID = tr.r_ID AND tr.t_ID = ?", array($request->getAttribute('team_id')));

			// do not send answers to teams
			$riddles = APIHelper::removeAttribute($riddles, 'answer');

			// get a list of solved riddles for dependency conditions
			$solved = [];
			foreach ($riddles as $riddle) {
				if ($riddle['state'] == 'SOLVED') {
					$solved[] = $riddle['r_ID'];
				}
			}

			$filtered = [];
			foreach ($riddles as $riddle) {

				// only send dependent riddles if precursor was solved
				if ($riddle['dep_ID'] !== null && !in_array($riddle['dep_ID'], $solved)) {
					continue;
				}

				// only send questions of unlocked position based riddles to teams
				if ($riddle['pos_lat']) {
					if ($riddle['state'] != 'SOLVED' && $riddle['state'] != 'UNLOCKED') {
						$riddle['question'] = '';
					}
				}
				$filtered[] = $riddle;
			}

			return $response->withJson($filtered, 200, JSON_NUMERIC_CHECK);
		} else {
			// no riddles for mrx
			return $response->withJson([], 200, JSON_NUMERIC_CHECK);
		}
	}
});

$app->post('/riddle',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('pos_lat' => $body['pos_lat'],
				'pos_long' => $body['pos_long'],
				'question' => $body['question'],
				'answer' => $body['answer'],
				'type' => $body['type'],
				'points' => $body['points'],
				'dep_ID' => $body['dep_ID']);

	$DB->insert('riddle', $data);

	return $response->withJson("success");
});

$app->put('/riddle/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$riddleId = $args['id'];
	$body = json_decode($request->getBody(), true);
	$data = array('pos_lat' => $body['pos_lat'],
				'pos_long' => $body['pos_long'],
				'question' => $body['question'],
				'answer' => $body['answer'],
				'type' => $body['type'],
				'points' => $body['points'],
				'dep_ID' => $body['dep_ID']);

	$DB->update('riddle', $data, array('r_ID' => $riddleId));

	return $response->withJson("success");
});

$app->delete('/riddle/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$deleted = $DB->delete('riddle', array('r_ID' => $args['id']));

	if ($deleted) {
		return $response->withJson("success");
	} else {
		return $response->withStatus(404);
	}
});

$app->post('/riddle/{id}/unlock',function (Request $request, Response $response, $args) use (&$DB, &$log, $config) {
	if (!$config['game_is_running']) {
		return $response->withStatus(403)->withJson("Error: Game is not running");
	}
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}

	// TODO: check if unlock is possible at the current location

	$riddleId = $args['id'];
	$teamId = $request->getAttribute('team_id');
	$data = array(
		'state' => 'UNLOCKED',
		'r_ID' => $riddleId,
		't_ID'=> $teamId,
		'img_ID' => 0
	);

	try {
		$updated = $DB->update('r_team_riddle', $data, array('r_ID' => $riddleId, 't_ID' => $teamId));
		if (!$updated) {
			$DB->insert('r_team_riddle', $data);
		}
		$log->riddle('Team '.$request->getAttribute('team_name').' hat ein Rätsel freigeschaltet', $riddleId);
		return $response->withJson("success");
	} catch (Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
		return $response->withStatus(403)->withJson("Already unlocked");
	}
});

$app->post('/riddle/{id}/solve',function (Request $request, Response $response, $args) use (&$DB, &$log, &$score, $config) {
	if (!$config['game_is_running']) {
		return $response->withStatus(403)->withJson("Error: Game is not running");
	}
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}
	$riddleId = $args['id'];
	$teamId = $request->getAttribute('team_id');
	$body = $request->getParsedBody();
	$team_answer = $body['answer'];

	function makeComparable($answer) {
		// Antwort auf ein möglichst einheitliches Format bringen,
		// damit nicht wegen Tippfehlern das Rätsel nicht gelöst werden kann.
		// 1. alles ausser Zahlen und Buchstaben entfernen (auch Umlaute)
		$answer = preg_replace("/[^A-Za-z0-9]/", '', $answer);
		// 2. alles zu Kleinbuchstaben konvertieren
		$answer = strtolower($answer);
		return $answer;
	}

	$riddle = $DB->fetchAssoc("
		SELECT r.*, tr.state FROM riddle r
		LEFT JOIN r_team_riddle tr
			ON tr.r_ID = r.r_ID
			AND tr.t_ID = ?
		WHERE r.r_ID = ?",
		array($teamId, $riddleId));

	// riddle does not exist
	if (!$riddle) {
		return $response->withJson(["solved" => false, "message" => "Rätsel nicht gefunden"]);
	}
	// it can only be solved once
	if ($riddle['state'] == 'SOLVED') {
		return $response->withJson(["solved" => false, "message" => "Rätsel bereits gelöst"]);
	}
	// if there is a position, it must be unlocked first
	if ($riddle['pos_lat'] && $riddle['state'] != 'UNLOCKED') {
		return $response->withJson(["solved" => false, "message" => "Rätsel nicht entsperrt"]);
	}
	// dependant riddle must be solved first
	if ($riddle['dep_ID']) {
		$dep_riddle = $DB->fetchAssoc("
			SELECT r.*, tr.state FROM riddle r
			LEFT JOIN r_team_riddle tr
				ON tr.r_ID = r.r_ID
				AND tr.t_ID = ?
			WHERE r.r_ID = ?",
			array($teamId, $riddle['dep_ID']));
		if ($dep_riddle['state'] != 'SOLVED') {
			return $response->withJson(["solved" => false, "message" => "Vorausgesetztes Rätsel muss zuerst gelöst werden"]);
		}
	}

	$data = array(
		'state' => 'SOLVED',
		'r_ID' => $riddleId,
		't_ID'=> $teamId,
		'img_ID' => 0
	);

	if (makeComparable($team_answer) == makeComparable($riddle['answer'])) {
		// answer is correct
		$updated = $DB->update('r_team_riddle', $data, array('r_ID' => $riddleId, 't_ID' => $teamId));
		if (!$updated) {
			$DB->insert('r_team_riddle', $data);
		}
		// TODO: punkte geben
		$score->riddle($teamId, $riddleId);
		$log->riddle('Team '.$request->getAttribute('team_name').' hat Rätsel '.$riddleId.' richtig gelöst', $riddleId);
		return $response->withJson(["solved" => true, "message" => "Richtige Antwort!"]);
	} else {
		// answer is wrong
		// TODO: punkte abziehen
		$score->riddle($teamId, $riddleId, true);
		$log->riddle('Team '.$request->getAttribute('team_name').' hat Rätsel '.$riddleId.' falsch gelöst', $riddleId);
		return $response->withJson(["solved" => false, "message" => "Deine Antwort ist falsch."]);
	}
});


// NOTIFICATIONS
$app->get('/notification', function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == true) {
		// admin sees all notifications
		$notifications = $DB->fetchAll("SELECT * FROM notification ORDER BY timestamp DESC");
	} else {
		if ($request->getAttribute('is_team') == true) {
			// teams see their own notifications and the "all"-notifications
			$notifications = $DB->fetchAll("SELECT * FROM notification WHERE t_ID = ? OR t_ID IS NULL ORDER BY timestamp DESC", array($request->getAttribute('team_id')));
		} else {
			// mrx only see the "all"-notifications
			$notifications = $DB->fetchAll("SELECT * FROM notification WHERE t_ID IS NULL ORDER BY timestamp DESC");
		}
	}
	return $response->withJson($notifications, 200, JSON_NUMERIC_CHECK);
});

$app->post('/notification',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('title' => $body['title'],
				'text' => $body['text']);

	if (isset($body['t_ID']) && $body['t_ID']) {
		$data['t_ID'] = $body['t_ID'];
	}

	$DB->insert('notification', $data);

	return $response->withJson("success");
});

$app->delete('/notification/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$deleted = $DB->delete('notification', array('n_ID' => $args['id']));

	if ($deleted) {
		return $response->withJson("success");
	} else {
		return $response->withStatus(404);
	}
});


// IMAGES
$app->get('/image/{filename}.jpg', function (Request $request, Response $response, $args) use (&$DB) {
	$filename = preg_replace("/[^0-9a-zA-Z_]+/", "", $args['filename']);
	$path = UPLOADED_IMAGE_FOLDER . $filename . '.jpg';
	if (file_exists($path)) {
		$response->write(file_get_contents($path));
		return $response->withHeader('Content-Type', 'image/jpeg');
	} else {
		return $response->withStatus(404)->withJson("No image with this name");
	}
});


// PASSCODES
$app->get('/passcode', function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$notifications = $DB->fetchAll("SELECT * FROM passcode");
	return $response->withJson($notifications, 200, JSON_NUMERIC_CHECK);
});

$app->post('/passcode', function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('code' => $body['code'],
				'points' => $body['points'],
				'used' => $body['used'],
				'mrx_ID' => $body['mrx_ID']);

	$DB->insert('passcode', $data);

	return $response->withJson("success");
});

$app->post('/passcode/solve', function (Request $request, Response $response, $args) use (&$DB, $config) {
	if (!$config['game_is_running']) {
		return $response->withStatus(403)->withJson("Error: Game is not running");
	}
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}

	$body = json_decode($request->getBody(), true);
	$teamId = $body['team_ID'];
	$code = $body['passcode'];

	$passcode = $DB->fetchAssoc("SELECT * from passcode where code = ?", array($code));

	// passcode does not exist
	if (!$passcode) {
		return $response->withJson(["solved" => false, "message" => "Passcode (" . $code . ") ist ungültig. "]);
	}
	// it can only be used once
	if ($passcode['used'] == '1') {
		return $response->withJson(["solved" => false, "message" => "Passcode bereits benutzt"]);
	}
	$DB->update('passcode', array('used' => '1'), array('p_ID' => $passcode['p_ID']));

	$team_data = array('t_ID' => $teamId,
											'points' => $passcode['points'],
											'type' => 'PASSCODE',
											'FK_ID' => $passcode['p_ID']);
	$DB->insert('r_team_points', $team_data);
	return $response->withJson(["solved" => true, "message" => "Passcode erfolgreich freigeschaltet!"]);
});

$app->put('/passcode/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$passcodeId = $args['id'];
	$body = json_decode($request->getBody(), true);
	$data = array('code' => $body['code'],
				'points' => $body['points'],
				'used' => $body['used'],
				'mrx_ID' => $body['mrx_ID']);

	$DB->update('passcode', $data, array('p_ID' => $passcodeId));

	return $response->withJson("success");
});

$app->delete('/passcode/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$deleted = $DB->delete('passcode', array('p_ID' => $args['id']));

	if ($deleted) {
		return $response->withJson("success");
	} else {
		return $response->withStatus(404);
	}
});

// LOG
$app->get('/log', function (Request $request, Response $response) use (&$DB) {
	$logs = $DB->fetchAll("SELECT * FROM log ORDER BY timestamp DESC");

	$logs_with_img = [];
	foreach ($logs as $log) {
		$img = null;
		switch ($log['type']) {
			case 'STATION':
				$result = $DB->fetchAssoc("SELECT img_ID FROM r_team_station WHERE rts_ID = ?", array($log['FK_ID']));
				if (isset($result['img_ID'])) {
					$img = $result['img_ID'];
				}
				break;
		}
		$log['image'] = $img;
		$logs_with_img[] = $log;
	}

	return $response->withJson($logs_with_img, 200, JSON_NUMERIC_CHECK);
});

// CONFIG
$app->get('/config', function (Request $request, Response $response) use (&$DB, $config) {
	return $response->withJson($config, 200, JSON_NUMERIC_CHECK);
});
$app->put('/config', function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$body = json_decode($request->getBody(), true);

	$DB->executeUpdate("UPDATE `config` set `value`=? where `key`=?", array($body['value'], $body['key']));

	return $response->withJson("success");
});


$app->get('/', function (Request $request, Response $response) {
	echo "PIO-X";
});

$app->run();
