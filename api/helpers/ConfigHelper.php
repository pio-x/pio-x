<?php

class ConfigHelper {
	/** @var \Doctrine\DBAL\Connection */
	private $DB;

	function __construct($db) {
		$this->DB = $db;
	}

	public function getConfig() {
		$result = $this->DB->fetchAll("SELECT * FROM config ORDER BY 'key' ASC");

		$config = [];
		foreach ($result as $item) {
			$config[$item['key']] = $item['value'];
		}
		return $config;
	}
}
