<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require 'vendor/autoload.php';
require 'conf.php';

require 'helpers/APIHelper.php';

require 'middleware/AddHeaders.php';
require 'middleware/Authentication.php';
require 'middleware/LogPosition.php';

use Doctrine\DBAL\DriverManager;

define('UPLOADED_IMAGE_FOLDER', 'uploaded_images/');

$DB = DriverManager::getConnection($SQL_CREDENTIALS, new \Doctrine\DBAL\Configuration());

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
	$sql = "SELECT station.*, captures.captured_timestamp, captures.t_ID as team, captures.color FROM station
		LEFT JOIN (
			SELECT ts.s_ID, ts.t_ID, max(timestamp) as captured_timestamp, team.color FROM r_team_station ts
			LEFT JOIN team ON team.t_ID = ts.t_ID
			GROUP BY s_ID
		) as captures ON captures.s_ID = station.s_ID";
	$stations = $DB->fetchAll($sql);
	return $response->withJson($stations, 200, JSON_NUMERIC_CHECK);
});

// images must be sent as body in data url format
$app->post('/station/{id}/capture',function (Request $request, Response $response, $args) use (&$DB) {
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
	$riddles = $DB->fetchAll("SELECT * FROM riddle");
	if ($request->getAttribute('is_admin') == false) {
		// TODO: only send unlocked/dependency solved riddles to teams
		// do not send answers to teams/mrx
		$riddles = APIHelper::removeAttribute($riddles, 'answer');
	}
	return $response->withJson($riddles, 200, JSON_NUMERIC_CHECK);
});

$app->post('/riddle',function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$body = json_decode($request->getBody(), true);
	$lat = $body['pos_lat'];
	$long = $body['pos_long'];
	$question = $body['question'];
	$answer = $body['answer'];
	$type = $body['type'];
	$points = $body['points'];
	$dep = $body['dep_ID'];

	$data = array('pos_lat' => $lat,
				'pos_long' => $long,
				'question' => $question,
				'answer' => $answer,
				'type' => $type,
				'points' => $points,
				'dep_ID' => $dep);

	$DB->insert('riddle', $data);

	return $response->withJson("success");
});

$app->put('/riddle/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_admin') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by an admin");
	}

	$riddleId = $args['id'];
	$body = json_decode($request->getBody(), true);

	$DB->update('riddle', $body, array('r_ID' => $riddleId));

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

$app->post('/riddle/{id}/unlock',function (Request $request, Response $response, $args) use (&$DB) {
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
