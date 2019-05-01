ALTER TABLE `riddle` ADD `answer_options` LONGTEXT  NULL AFTER `answer`;
ALTER TABLE `riddle` ADD `answer_options_enabled` TINYINT(1)  NOT NULL  DEFAULT '0'  AFTER `answer_options`;
