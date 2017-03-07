<?php
use \Slim\Http\Request as Request;
use \Slim\Http\Response as Response;
use Doctrine\DBAL\DriverManager;


require 'vendor/autoload.php';
require 'conf.php';

require 'helpers/APIHelper.php';
require 'helpers/ConfigHelper.php';
require 'helpers/LogHelper.php';
require 'helpers/Passcodes.php';
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
	if (!$request->getAttribute('is_admin') && !$config['game_is_running']) {
		return $response->withJson([]);
	}

	if ($request->getAttribute('is_admin')) {
		// stations with last capture info
		$sql = "
			SELECT s.*, ts2.t_id as team, UNIX_TIMESTAMP(ts2.timestamp)*1000 as captured_timestamp FROM (
				SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
			) as ts1
			INNER JOIN r_team_station as ts2
				ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
			RIGHT JOIN station s
				ON s.s_ID = ts2.s_ID
			ORDER BY s.s_ID
		";
	} else {
		// stations with last capture info
		$sql = "
			SELECT s.*, ts2.t_id as team, UNIX_TIMESTAMP(ts2.timestamp)*1000 as captured_timestamp FROM (
				SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
			) as ts1
			INNER JOIN r_team_station as ts2
				ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
			RIGHT JOIN station s
				ON s.s_ID = ts2.s_ID
			WHERE s.enabled = 1
			ORDER BY s.s_ID
		";
	}



	$stations = $DB->fetchAll($sql);
	return $response->withJson($stations, 200, JSON_NUMERIC_CHECK);
});

// STATION SINGLE
$app->get('/station/{id}',function (Request $request, Response $response, $args) use (&$DB, $config) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$station = $DB->fetchAssoc("SELECT * FROM station WHERE s_ID = ?", array($args['id']));

	return $response->withJson($station, 200, JSON_NUMERIC_CHECK);
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

	$station = $DB->fetchAssoc("SELECT name, enabled FROM station WHERE s_ID = ?", array($stationId));

	if (!$station['enabled']) {
		return $response->withStatus(403)->withJson("Error: this station is not enabled");
	}

	$qsa = $request->getQueryParams();
	$imageId = 'capture_s' . $stationId . '_t' . $teamId . '_' . round(microtime(true) * 1000);
	process_and_save_image($imageId, $body, $qsa);

	// TODO: location check

	$data = array(
		's_ID' => $stationId,
		't_ID' => $teamId,
		'img_ID' => $imageId
	);

	$DB->insert('r_team_station', $data);
	$insertId = $DB->lastInsertId();

	$log->station('Team '.$request->getAttribute('team_name').' hat die Station '.$station['name'].' eingenommen', $request->getAttribute('team_id'), $insertId);
	if (isset($qsa['tags'])) {
		$tags = json_decode($qsa['tags'], true);
	} else {
		$tags = [];
	}
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
				'name' => $body['name']);

	if (isset($body['enabled'])) {
		$data['enabled'] = ($body['enabled'] ? 1 : 0 );
	}
	if (isset($body['description'])) {
		$data['description'] = (string)($body['description']);
	} else {
		$data['description'] = '';
	}

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
			'enabled' => ($body['enabled'] ? 1 : 0 ),
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

$app->put('/team/{id}/image', function (Request $request, Response $response, $args) use (&$DB, $config) {
	$teamId = intval($args['id']);
	if (!$request->getAttribute('is_team') && !$request->getAttribute('is_admin')) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}
	if ($request->getAttribute('team_id') != $teamId) {
		return $response->withStatus(403)->withJson("Error: teams can only change their own image");
	}

	$body = (string) $request->getBody();
	if (substr($body,0,10) != 'data:image') {
		return $response->withStatus(403)->withJson("Error: no valid image data sent");
	}

	$qsa = $request->getQueryParams();
	$imageId = 'team_' . $teamId . '_' . round(microtime(true) * 1000);
	process_and_save_image($imageId, $body, $qsa);


	$DB->update('team', array('img_ID' => $imageId), array('t_ID' => $teamId));

	return $response->withJson("success");
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
		$data['hash'] = passcode(3);
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

$app->get('/team/{id}/location', function (Request $request, Response $response, $args) use (&$DB, $config) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$teamId = $args['id'];
	$players = $DB->fetchAll("SELECT DISTINCT player FROM teamposition WHERE t_ID = ?", array($teamId));

	$data = [];
	if (is_array($players) && count($players)) {
		foreach ($players as $playerdata) {
			$player = $playerdata['player'];
			$data[$player] = [];
			$locations = $DB->fetchAll("SELECT team_lat as lat, team_long as lng, UNIX_TIMESTAMP(timestamp)*1000 as timestamp FROM teamposition WHERE t_ID = ? AND player = ? ORDER BY timestamp DESC", array($teamId, $player));
			foreach ($locations as $location) {
				if (count($data[$player]) > 0) {
					// remove duplicates: only add position if last added position is different
					$lastElement = array_values(array_slice($data[$player], -1))[0];
					if ($lastElement['lat'] != $location['lat'] || $lastElement['lng'] != $location['lng']) {
						$data[$player][] = $location;
					}
				} else {
					$data[$player][] = $location;
				}
			}
		}
	}

	return $response->withJson($data, 200, JSON_NUMERIC_CHECK);
});


// MISTER X
$app->get('/mrx', function (Request $request, Response $response) use (&$DB, $config) {
	if (!$request->getAttribute('is_admin') && !$config['game_is_running']) {
		return $response->withJson([]);
	}

	$mrxs = $DB->fetchAll("SELECT * FROM mrx");

	// do not send hashes to teams/mrx
	if (!$request->getAttribute('is_admin')) {
		$mrxs = APIHelper::removeAttribute($mrxs, 'x_hash');
	}

	$data = [];
	foreach ($mrxs as $mrx) {
		// TODO: nur senden wenn noch nicht gefangen
		$locations = $DB->fetchAll("SELECT xpos_lat, xpos_long, UNIX_TIMESTAMP(timestamp)*1000 as timestamp, description FROM mrx_position WHERE mrx_ID = ? ORDER BY timestamp desc LIMIT 3", array($mrx['x_ID']));

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
	if (!$request->getAttribute('is_admin') && !$config['game_is_running']) {
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
				if ($riddle['dep_ID'] && !in_array($riddle['dep_ID'], $solved)) {
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
				'title' => $body['title'],
				'answer' => $body['answer'],
				'type' => $body['type'],
				'points' => $body['points'],
				'answer_required' => $body['answer_required'],
				'image_required' => $body['image_required'],
				'dep_ID' => isset($body['dep_ID']) ? $body['dep_ID'] : NULL);

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
				'title' => $body['title'],
				'answer' => $body['answer'],
				'type' => $body['type'],
				'points' => $body['points'],
				'answer_required' => $body['answer_required'],
				'image_required' => $body['image_required'],
				'dep_ID' => isset($body['dep_ID']) ? $body['dep_ID'] : NULL);

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
		$log->riddle('Team '.$request->getAttribute('team_name').' hat ein Rätsel freigeschaltet', $request->getAttribute('team_id'), $riddleId);
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

	$solved = false;
	if ($riddle['answer_required']) {
		$team_answer = $body['answer'];
		if (makeComparable($team_answer) == makeComparable($riddle['answer'])) {
				$solved = true;
		}
	} else if ($riddle['image_required']) {
		$body = (string) $request->getBody();
		if (substr($body,0,10) != 'data:image') {
			return $response->withJson(["solved" => false, "message" => "Kein Bild gesendet!"]);
		} else {
			$qsa = $request->getQueryParams();
			$id = 'riddle_r' . $riddle['r_ID'] . '_t' . $teamId . '_' . round(microtime(true) * 1000);
			process_and_save_image($id, $body, $qsa);
			$solved = true;
		}
	}

	if ($solved) {
		// answer is correct
		$updated = $DB->update('r_team_riddle', $data, array('r_ID' => $riddleId, 't_ID' => $teamId));
		if (!$updated) {
			$DB->insert('r_team_riddle', $data);
		}
		// TODO: punkte geben
		$score->riddle($teamId, $riddleId);
		$log->riddle('Team '.$request->getAttribute('team_name').' hat Rätsel '.$riddleId.' richtig gelöst', $request->getAttribute('team_id'), $riddleId);
		return $response->withJson(["solved" => true, "message" => "Richtige Antwort!"]);
	} else {
		// answer is wrong
		// TODO: punkte abziehen
		$score->riddle($teamId, $riddleId, true);
		$log->riddle('Team '.$request->getAttribute('team_name').' hat Rätsel '.$riddleId.' falsch gelöst', $request->getAttribute('team_id'), $riddleId);
		return $response->withJson(["solved" => false, "message" => "Deine Antwort ist falsch."]);
	}
});


// NOTIFICATIONS
$app->get('/notification', function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == true) {
		// admin sees all notifications
		$notifications = $DB->fetchAll("SELECT n_ID, title, text, UNIX_TIMESTAMP(timestamp)*1000 as timestamp, t_ID FROM notification ORDER BY timestamp DESC");
	} else {
		if ($request->getAttribute('is_team') == true) {
			// teams see their own notifications and the "all"-notifications
			$notifications = $DB->fetchAll("SELECT n_ID, title, text, UNIX_TIMESTAMP(timestamp)*1000 as timestamp, t_ID FROM notification WHERE t_ID = ? OR t_ID IS NULL ORDER BY timestamp DESC", array($request->getAttribute('team_id')));
		} else {
			// mrx only see the "all"-notifications
			$notifications = $DB->fetchAll("SELECT n_ID, title, text, UNIX_TIMESTAMP(timestamp)*1000 as timestamp, t_ID FROM notification WHERE t_ID IS NULL ORDER BY timestamp DESC");
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
	$data = array(
		'code' => $body['code'],
		'points' => $body['points'],
		'mrx_ID' => ($body['mrx_ID'] ? $body['mrx_ID'] : 0)
	);

	if (isset($body['code']) && $body['code']) {
		$data['code'] = $body['code'];
	} else {
		$data['code'] = simplepasscode(6);
	}

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
	$teamId = $request->getAttribute('team_id');;
	$code = $body['passcode'];


	// for debug only
	if ($code == 'error') {
		return $response->write('i am an error :{ ...and i have a moustache');
	}

	$passcode = $DB->fetchAssoc("SELECT * from passcode where code = ?", array($code));

	// passcode does not exist
	if (!$passcode) {
		return $response->withJson(["solved" => false, "message" => "Passcode (" . $code . ") ist ungültig. "]);
	}
	// it can only be used once
	if ($passcode['used'] == '1') {
		return $response->withJson(["solved" => false, "message" => "Passcode bereits benutzt"]);
	}

	// check if team already used a code for this mrx
	if ($passcode['mrx_ID']) {
		$mrx_catched = $DB->fetchAssoc("SELECT * from r_team_mrx where t_ID = ? AND x_ID = ?", array($teamId, $passcode['mrx_ID']));
		if ($mrx_catched) {
			return $response->withJson(["solved" => false, "message" => "Mr.X bereits gefangen."]);
		}
	}

	$DB->update('passcode', array('used' => '1'), array('p_ID' => $passcode['p_ID']));

	// update points
	$team_data = array('t_ID' => $teamId,
						'points' => $passcode['points'],
						'type' => 'PASSCODE',
						'FK_ID' => $passcode['p_ID']);
	$DB->insert('r_team_points', $team_data);

	// update mrx found status
	if ($passcode['mrx_ID']) {
		$team_mrx_data = array('t_ID' => $teamId, 'x_ID' => $passcode['mrx_ID']);
		$DB->insert('r_team_mrx', $team_mrx_data);
	}

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
	$logs = $DB->fetchAll("SELECT l_ID, text, UNIX_TIMESTAMP(timestamp)*1000 as timestamp, type, FK_ID, t_ID FROM log ORDER BY timestamp DESC");

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

// STATISTICS
$app->get('/statistics/points', function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by admin");
	}

	$teams = [];

	$rows = $DB->fetchAll("SELECT * FROM team");
	foreach ($rows as $team) {
		$teams[$team['t_ID']] = [
			"name" => $team['name'] . ' (ID:' . $team['t_ID'] . ')',
			"data" => []
		];
	}

	$rows = $DB->fetchAll("SELECT t_ID, sum(points) as points, UNIX_TIMESTAMP(timestamp)*1000 as timestamp 
			FROM r_team_points 
			GROUP BY t_ID, timestamp 
			ORDER BY timestamp ASC");

	foreach ($rows as $row) {
		$lastpoints = 0;
		if (count($teams[$row['t_ID']]['data']) > 0) {
			$lastelement = count($teams[$row['t_ID']]['data']) - 1;
			$lastpoints = $teams[$row['t_ID']]['data'][$lastelement][1];
		}
		$teams[$row['t_ID']]['data'][] = [
			$row['timestamp'],
			$lastpoints + $row['points']
		];
		// max. 200 einträge pro team senden, da statistik sonst zu langsam ist beim anzeigen
		if (count($teams[$row['t_ID']]['data']) > 200) {
			array_shift($teams[$row['t_ID']]['data']);
		}
	}

	return $response->withJson($teams, 200, JSON_NUMERIC_CHECK);
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

function process_and_save_image($imageId, $body, $qsa) {
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
	$filename = UPLOADED_IMAGE_FOLDER.$imageId.'.jpg';
	imagejpeg($image, $filename, 75);
	chmod($filename, 0766);
}
