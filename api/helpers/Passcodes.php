<?php

include_once("Passcodestrings.php");

function randomWord($pwWords, $min, $max) {
    $word = $pwWords[floor(rand(0, count($pwWords)-1))];
    while (count($word) > $min and count($word) < $max ) {
        $word = $pwWords[floor(rand(0, count($pwWords)-1))];
    }
    return $word;
}

function passcode($words) {
    global $pwWords;
    $passcode = '';

    for ($i=0;$i<$words;$i++) {
        $passcode .= randomWord($pwWords, 3,7);
    }
    
    return $passcode;
}

function simplepasscode($numbers) {
    $simplepasscode = '';

    for ($i=0;$i<$numbers;$i++) {
        $simplepasscode .= rand(1,9);
    }
    
    return $simplepasscode;
}
