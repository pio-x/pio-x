<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require 'vendor/autoload.php';
require 'conf.php';

require 'middleware/AddHeaders.php';
require 'middleware/Authentication.php';
require 'middleware/LogPosition.php';

use Doctrine\DBAL\DriverManager;

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

$app->post('/station/{id}/capture',function (Request $request, Response $response, $args) use (&$DB) {
	if ($request->getAttribute('is_team') == false) {
		return $response->withStatus(403)->withJson("Error: not sent by a team");
	}

	// TODO: location check

	$stationId = $args['id'];
	$teamId = $request->getAttribute('team_id');

	$data = array(
		's_ID' => $stationId,
		't_ID' => $teamId,
		'img_ID' => 0
	);

	$DB->insert('r_team_station', $data);

	return $response->withJson("success");
});


$app->put('/station',function (Request $request, Response $response) use (&$DB) {
	$body = json_decode($request->getBody(), true);
	$lat = $body['pos_lat'];
	$long = $body['pos_long'];
	$name = $body['name'];
	$description = $body['description'];

	$data = array('pos_lat' => $lat,
				'pos_long' => $long,
				'name' => $name,
				'description' => $description);

	$DB->insert('station', $data);

	return $response->withJson("success");
});

// TEAM
$app->get('/team', function (Request $request, Response $response) use (&$DB) {
	$teams = $DB->fetchAll("SELECT * FROM team");
	return $response->withJson($teams, 200, JSON_NUMERIC_CHECK);
});

$app->get('/team/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	$teamId = $args['id'];
	$team = $DB->fetchAll("SELECT * FROM team WHERE t_ID = ?", array($teamId));

	if(sizeof($team) > 0) {
		return $response->withJson($team, 200, JSON_NUMERIC_CHECK);
	} else {
		return $response->withStatus(404)->withJson("team not found");
	}
});

// MISTER X
$app->get('/mrx', function (Request $request, Response $response) use (&$DB) {
	if ($request->getAttribute('is_admin') == true) {
		$mrxs = $DB->fetchAll("SELECT * FROM mrx");
	} else {
		$mrxs = $DB->fetchAll("SELECT x_ID, name FROM mrx");
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
	return $response->withJson($riddles, 200, JSON_NUMERIC_CHECK);
});

$app->get('/riddle/{id}', function (Request $request, Response $response, $args) use (&$DB) {
	$riddleId = $args['id'];
	$riddle = $DB->fetchAll("SELECT * FROM riddle WHERE r_ID = ?", array($riddleId));

	if(sizeof($riddle) > 0) {
		return $response->withJson($riddle, 200, JSON_NUMERIC_CHECK);
	} else {
		return $response->withStatus(404)->withJson("riddle not found");
	}
});

$app->put('/riddle',function (Request $request, Response $response) use (&$DB) {
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

$app->post('/riddle/{id}',function (Request $request, Response $response, $args) use (&$DB) {
	$riddleId = $args['id'];
	$body = json_decode($request->getBody(), true);

	$DB->update('riddle', $body, array('r_ID' => $riddleId));

	return $response->withJson("success");
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
	$notifications = $DB->fetchAll("SELECT * FROM notification ORDER BY timestamp DESC");
	return $response->withJson($notifications, 200, JSON_NUMERIC_CHECK);
});

$app->get('/', function (Request $request, Response $response) {
	echo "PIO-X";
});

$app->run();
