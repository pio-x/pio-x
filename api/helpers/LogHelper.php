<?php

class LogHelper {
	/** @var \Doctrine\DBAL\Connection */
	private $DB;

	function __construct($db) {
		$this->DB = $db;
	}

	public function riddle($text, $team, $fk = 0) {
		$this->addLog('RIDDLE', $text, $team, $fk);
	}

	public function mrx($text, $team, $fk = 0) {
		$this->addLog('MRX', $text, $team, $fk);
	}

	public function station($text, $team, $fk = 0) {
		$this->addLog('STATION', $text, $team, $fk);
	}

	public function other($text, $team, $fk = 0) {
		$this->addLog('OTHER', $text, $team, $fk);
	}

	public function addLog($type, $text, $team, $fk = 0) {
		$data = array(
			'text' => $text,
			'type' => $type,
			't_ID' => $team,
			'FK_ID' => $fk
		);
		$this->DB->insert('log', $data);
	}
}
