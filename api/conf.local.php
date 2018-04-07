<?php

$SQL_CREDENTIALS = array(
	'dbname' => getenv('PIOX_DBNAME') === false ? 'piox': getenv('PIOX_DBNAME'),
	'user' => getenv('PIOX_DBUSER') === false ? 'root': getenv('PIOX_DBUSER'),
	'password' => getenv('PIOX_DBPASS') === false ? 'mysecretpioXdbpassword': getenv('PIOX_DBPASS'),
	'host' => getenv('PIOX_DBHOST') === false ? 'mysql:3306': getenv('PIOX_DBHOST'),
	'driver' => 'pdo_mysql',
	'charset' => 'utf8',
	'driverOptions' => array(
		1002=>'SET NAMES utf8'
	)
);
date_default_timezone_set('Europe/Zurich');
