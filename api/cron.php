<?php
use Doctrine\DBAL\DriverManager;

require 'vendor/autoload.php';
require 'conf.php';

require 'helpers/ScoreHelper.php';
require 'helpers/ConfigHelper.php';

$DB = DriverManager::getConnection($SQL_CREDENTIALS, new \Doctrine\DBAL\Configuration());

$scoreHelper = new ScoreHelper($DB);
$configHelper = new ConfigHelper($DB);

function logdate() {
	return '['.date('H:i:s').'] ';
}

echo logdate() .'Starting Cron'.PHP_EOL;

// Abort if game is not running
$config = $configHelper->getConfig();
if (!$config['game_is_running']) {
	echo logdate() .'Game is not running. Aborting.'.PHP_EOL;
	die();
}

$sql = "SELECT ts2.* FROM (
			SELECT s_ID, MAX(timestamp) as timestamp FROM r_team_station GROUP BY s_ID
		) as ts1 
		INNER JOIN r_team_station as ts2 
			ON ts1.s_ID = ts2.s_ID AND ts1.timestamp = ts2.timestamp
		LEFT JOIN station s
			ON s.s_ID = ts2.s_ID
		WHERE s.enabled = 1";

$stations = $DB->fetchAll($sql);

foreach ($stations as $station) {
	echo logdate() .'Station '.$station['s_ID'].' owned by team '.$station['t_ID'].PHP_EOL;
	$scoreHelper->station($station['t_ID'], $station['s_ID']);
}

echo logdate() .'Done.'.PHP_EOL;
