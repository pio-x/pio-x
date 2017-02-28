<?php
	error_reporting(E_ALL);
	echo "<pre>";
	$out = shell_exec('/var/www/piox/deploy.sh');
	echo $out;
	echo "</pre>";
