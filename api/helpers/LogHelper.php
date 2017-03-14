<?php

class LogHelper {
	/** @var \Doctrine\DBAL\Connection */
	private $DB;

	function __construct($db) {
		$this->DB = $db;
	}

	public function riddle($text, $team, $fk = 0, $img_ID = '') {
		$this->addLog('RIDDLE', $text, $team, $fk, $img_ID);
	}

	public function mrx($text, $team, $fk = 0, $img_ID = '') {
		$this->addLog('MRX', $text, $team, $fk, $img_ID);
	}

	public function station($text, $team, $fk = 0, $img_ID = '') {
		$this->addLog('STATION', $text, $team, $fk, $img_ID);
	}

	public function profile($text, $team, $fk = 0, $img_ID = '') {
		$this->addLog('PROFILE', $text, $team, $fk, $img_ID);
	}

	public function other($text, $team, $fk = 0, $img_ID = '') {
		$this->addLog('OTHER', $text, $team, $fk, $img_ID);
	}

	public function addLog($type, $text, $team, $fk = 0, $img_ID = '') {
		$data = array(
			'text' => $text,
			'type' => $type,
			't_ID' => $team,
			'FK_ID' => $fk,
			'img_ID' => $img_ID
		);
		$this->DB->insert('log', $data);
	}
}
