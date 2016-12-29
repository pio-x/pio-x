<?php
	echo "<pre>";
	$out = shell_exec('/home/dienerli/public_html/pioxapp/deploy.sh');
	echo $out;
    echo "</pre>";