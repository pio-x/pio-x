<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require 'vendor/autoload.php';
require 'conf.php';

require 'helpers/APIHelper.php';
require 'helpers/LogHelper.php';

require 'middleware/AddHeaders.php';
require 'middleware/Authentication.php';
require 'middleware/LogPosition.php';

use Doctrine\DBAL\DriverManager;

define('UPLOADED_IMAGE_FOLDER', 'uploaded_images/');

$DB = DriverManager::getConnection($SQL_CREDENTIALS, new \Doctrine\DBAL\Configuration());

$log = new LogHelper($DB);

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);


// 3. log team location
$app->add(new LogPosition($DB));

// 2. check if is authenticated (all routes) and add arguments
$app->add(new Authentication($DB));

// 1. always add CORS headers
$app->add(new AddHeaders());

// STATION
$app->get('/station',function (Request $request, Response $response) use (&$DB) {
	// stations with last capture info
	$sql = "
	SELECT s.*, ts2.t_id, t.color, ts2.timestamp FROM (
		SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
	) as ts1 
	INNER JOIN r_team_station as ts2 
		ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
	RIGHT JOIN station s 
		ON s.s_ID = ts2.s_ID
	LEFT JOIN team t 
		ON t.t_ID = ts2.t_ID
	ORDER BY s.s_ID
";

	$stations = $DB->fetchAll($sql);
	return $response->withJson($stations, 200, JSON_NUMERIC_CHECK);
});

// images must be sent as body in data url format
$app->post('/station/{id}/capture',function (Request $request, Response $response, $args) use (&$DB, &$log) {
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
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

	$station = $DB->fetchAll("SELECT name FROM station WHERE s_ID = ?", array($stationId));
	$log->station('Team '.$request->getAttribute('team_name').' hat die Station '.$station[0]['name'].' eingenommen', $DB->lastInsertId());

	return $response->withJson($tags);
});

$app->post('/station',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);

	$data = array('pos_lat' => $body['pos_lat'],
				'pos_long' => $body['pos_long'],
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
	$teams = $DB->fetchAll("SELECT * FROM team");
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$teams = APIHelper::removeAttribute($teams, 'hash');
	}

	return $response->withJson($teams, 200, JSON_NUMERIC_CHECK);
});

$app->get('/team/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	$teamId = $args['id'];
	$team = $DB->fetchAll("SELECT * FROM team WHERE t_ID = ?", array($teamId));
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$team = APIHelper::removeAttribute($team, 'hash');
	}

	if(sizeof($team) > 0) {
		return $response->withJson($team[0], 200, JSON_NUMERIC_CHECK);
	} else {
		return $response->withStatus(404)->withJson("team not found");
	}
});

$app->post('/team',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);
	$data = array('name' => $body['name'],
				'color' => $body['color']);

	if (isset($body['hash']) && $body['hash']) {
		$data['hash'] = $body['hash'];
	} else {
		$data['hash'] = md5(time() . $body['name'] . 'PIOX' . rand());
	}

	$DB->insert('team', $data);

	return $response->withJson("success");
});


// MISTER X
$app->get('/mrx', function (Request $request, Response $response) use (&$DB) {
	$mrxs = $DB->fetchAll("SELECT * FROM mrx");
	if ($request->getAttribute('is_admin') == false) {
		// do not send hashes to teams/mrx
		$mrxs = APIHelper::removeAttribute($mrxs, 'x_hash');
	}
	$data = [];
	foreach ($mrxs as $mrx) {
		// TODO: positionen bei teams nur mitschicken wenn sie sie sehen dürfen
		$locations = $DB->fetchAll("SELECT * FROM mrx_position WHERE mrx_ID = ? ORDER BY timestamp desc", array($mrx['x_ID']));
		$mrx['locations'] = $locations;
		$data[] = $mrx;
	}
	return $response->withJson($data, 200, JSON_NUMERIC_CHECK);
});


// TOM RIDDLE
$app->get('/riddle', function (Request $request, Response $response) use (&$DB) {
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

$app->post('/riddle/{id}/unlock',function (Request $request, Response $response, $args) use (&$DB, &$log) {
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
		$DB->insert('r_team_riddle', $data);
		$log->riddle('Team '.$request->getAttribute('team_name').' hat ein Rätsel entsperrt', $DB->lastInsertId());
		return $response->withJson("success");
	} catch (Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
		return $response->withStatus(403)->withJson("Already unlocked");
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



$app->get('/', function (Request $request, Response $response) {
	echo "PIO-X";
});

$app->run();
