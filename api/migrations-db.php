<?php

return [
	'dbname' => getenv('PIOX_DBNAME'),
	'user' => getenv('PIOX_DBUSER'),
	'password' => getenv('PIOX_DBPASS'),
	'host' => getenv('PIOX_DBHOST'),
	'driver' => 'pdo_mysql',
];
