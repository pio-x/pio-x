<?php

class LogHelper {
	private $DB;

	function __construct($db) {
		$this->DB = $db;
	}

	public function riddle($text, $fk = 0) {
		$this->addLog('RIDDLE', $text, $fk);
	}

	public function mrx($text, $fk = 0) {
		$this->addLog('MRX', $text, $fk);
	}

	public function station($text, $fk = 0) {
		$this->addLog('STATION', $text, $fk);
	}

	public function other($text, $fk = 0) {
		$this->addLog('OTHER', $text, $fk);
	}

	public function addLog($type, $text, $fk = 0) {
		$data = array(
			'text' => $text,
			'type' => $type,
			'FK_ID' => $fk
		);
		$this->DB->insert('log', $data);
	}
}
