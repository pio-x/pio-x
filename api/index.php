<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require 'vendor/autoload.php';
require 'conf.php';

use Doctrine\DBAL\DriverManager;

$DB = DriverManager::getConnection($SQL_CREDENTIALS, new \Doctrine\DBAL\Configuration());

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

// STATION
$app->get('/station',function (Request $request, Response $response) use (&$DB) {
    $stations = $DB->fetchAll("SELECT * FROM station");
    return $response->withJson($stations);
});

//request: { "id": 5}
$app->post('/station/{id}/capture',function (Request $request, Response $response, $args) use (&$DB) {
  $stationId = $args['id'];
  $body = json_decode($request->getBody(), true);
  $teamId = $body['id'];

  $data = array('s_ID' => $stationId,
                't_ID' => $teamId);

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
    return $response->withJson($teams);
});

$app->get('/team/{id}', function (Request $request, Response $response, $args) use (&$DB) {
    $teamId = $args['id'];
    $team = $DB->fetchAll("SELECT * FROM team WHERE t_ID = ?", array($teamId));

    if(sizeof($team) > 0) {
        return $response->withJson($team);
    } else {
        throw new \Slim\Exception\NotFoundException($request, $response);
    }
});


// TOM RIDDLE
$app->get('/riddle', function (Request $request, Response $response) use (&$DB) {
    $riddles = $DB->fetchAll("SELECT * FROM riddle");
    return $response->withJson($riddles);
});

$app->get('/riddle/{id}', function (Request $request, Response $response, $args) use (&$DB) {
    $riddleId = $args['id'];
    $riddle = $DB->fetchAll("SELECT * FROM riddle WHERE r_ID = ?", array($riddleId));

    if(sizeof($riddle) > 0) {
      return $response->withJson($riddle);
    } else {
        throw new \Slim\Exception\NotFoundException($request, $response);
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
  $riddleId = $args['id'];
  $body = json_decode($request->getBody(), true);
  $teamId = $body['teamId'];

  $sql = 'UPDATE r_team_riddle SET state = "UNLOCKED" WHERE r_ID = $riddleId AND t_ID => $teamId';

//TODO
  return $response->withJson("success");
});


// NOTIFICATIONS
$app->get('/notification', function (Request $request, Response $response) use (&$DB) {
    $notifications = $DB->fetchAll("SELECT * FROM notification ORDER BY timestamp DESC");
    return $response->withJson($notifications);
});

$app->get('/', function (Request $request, Response $response) {
    echo "PIO-X";
});

$app->run();
