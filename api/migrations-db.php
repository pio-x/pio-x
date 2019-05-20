<?php

if (file_exists('conf.php')) {
	require_once 'conf.php';
} else {
	require_once 'conf.local.php';
}

return [
	'dbname' => $SQL_CREDENTIALS['dbname'],
	'user' => $SQL_CREDENTIALS['user'],
	'password' => $SQL_CREDENTIALS['password'],
	'host' => $SQL_CREDENTIALS['host'],
	'driver' => 'pdo_mysql',
];
