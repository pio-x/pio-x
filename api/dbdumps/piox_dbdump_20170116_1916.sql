# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: pio-x.ch (MySQL 5.6.33-log)
# Datenbank: dienerli_piox1
# Erstellt am: 2017-01-16 18:16:06 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Export von Tabelle config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `key` varchar(100) NOT NULL DEFAULT '',
  `value` text,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;

INSERT INTO `config` (`key`, `value`)
VALUES
	('game_is_running','1'),
	('riddle_radius','100'),
	('station_radius','100');

/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `l_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'log ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'log time',
  `text` varchar(1000) NOT NULL DEFAULT '' COMMENT 'log text',
  `type` enum('RIDDLE','STATION','MRX','OTHER') NOT NULL DEFAULT 'OTHER' COMMENT 'log type',
  `FK_ID` int(11) NOT NULL COMMENT 'FK ID of type',
  PRIMARY KEY (`l_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;

INSERT INTO `log` (`l_ID`, `timestamp`, `text`, `type`, `FK_ID`)
VALUES
	(8,'2017-01-15 17:55:49','Team Team Grün hat die Station o19 eingenommen','STATION',23),
	(9,'2017-01-15 20:13:10','Team Team Gelb hat die Station Buon Gusto eingenommen','STATION',24);

/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle mrx
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mrx`;

CREATE TABLE `mrx` (
  `x_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK mrx ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT 'mrx name',
  `x_hash` varchar(100) NOT NULL DEFAULT '' COMMENT 'mrx hash',
  PRIMARY KEY (`x_ID`),
  UNIQUE KEY `x_hash` (`x_hash`),
  UNIQUE KEY `name` (`name`),
  KEY `x_hash_2` (`x_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `mrx` WRITE;
/*!40000 ALTER TABLE `mrx` DISABLE KEYS */;

INSERT INTO `mrx` (`x_ID`, `name`, `x_hash`)
VALUES
	(1,'Mr.X','x111'),
	(2,'Mr.Y','x222'),
	(3,'Mr.Z','x333');

/*!40000 ALTER TABLE `mrx` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle mrx_position
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mrx_position`;

CREATE TABLE `mrx_position` (
  `xpos_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK mrx position ID',
  `xpos_lat` double NOT NULL COMMENT 'mrx latitude',
  `xpos_long` double NOT NULL COMMENT 'mrx longitude',
  `mrx_ID` int(11) NOT NULL COMMENT 'FK mrx ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'mrx position timestamp',
  `description` varchar(1000) NOT NULL DEFAULT '' COMMENT 'mrx position description',
  PRIMARY KEY (`xpos_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `mrx_position` WRITE;
/*!40000 ALTER TABLE `mrx_position` DISABLE KEYS */;

INSERT INTO `mrx_position` (`xpos_ID`, `xpos_lat`, `xpos_long`, `mrx_ID`, `timestamp`, `description`)
VALUES
	(1,47.50310134887695,8.73583984375,1,'2016-12-31 17:11:27','Zu Fuss unterwegs zum Bus.'),
	(2,47.504798889160156,8.736860275268555,1,'2016-12-31 17:11:33','Nehme den Bus Nr.10'),
	(3,47.50790023803711,8.758110046386719,1,'2016-12-31 17:11:41','Nehme den Bus Nr.1'),
	(4,47.498600006103516,8.748880386352539,2,'2016-12-31 17:11:48','Nehme den Zug'),
	(5,47.48749923706055,8.76436996459961,2,'2016-12-31 17:11:55','Nehme den Bus Nr.2');

/*!40000 ALTER TABLE `mrx_position` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
  `n_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK notifications',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT 'notification title',
  `text` varchar(1000) NOT NULL DEFAULT '' COMMENT 'notification text',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'notification time',
  `t_ID` int(11) DEFAULT NULL COMMENT 'team ID if private',
  PRIMARY KEY (`n_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;

INSERT INTO `notification` (`n_ID`, `title`, `text`, `timestamp`, `t_ID`)
VALUES
	(1,'Achtung, fertig, los!','Das Spiel beginnt um 14:00 Uhr!','2016-12-29 15:02:06',NULL),
	(2,'Mr.X gesichtet!','Mister X wurde gesehen','2016-12-29 15:02:06',1),
	(3,'Neue Nachricht','Test','2017-01-05 22:23:20',NULL);

/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle passcode
# ------------------------------------------------------------

DROP TABLE IF EXISTS `passcode`;

CREATE TABLE `passcode` (
  `p_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'passcode ID',
  `code` varchar(100) NOT NULL DEFAULT '',
  `points` int(11) NOT NULL COMMENT 'score points',
  `used` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'passcode used',
  `mrx_ID` int(11) NOT NULL COMMENT 'FK mrx ID',
  PRIMARY KEY (`p_ID`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `passcode` WRITE;
/*!40000 ALTER TABLE `passcode` DISABLE KEYS */;

INSERT INTO `passcode` (`p_ID`, `code`, `points`, `used`, `mrx_ID`)
VALUES
	(1,'18',20,0,0),
	(2,'3',30,0,0),
	(3,'123abc',15,0,0),
	(4,'12',7,0,0),
	(5,'mrx1a',50,0,0);

/*!40000 ALTER TABLE `passcode` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle r_team_mrx
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_mrx`;

CREATE TABLE `r_team_mrx` (
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `x_ID` int(11) NOT NULL COMMENT 'FK mrx ID',
  PRIMARY KEY (`t_ID`,`x_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_mrx` WRITE;
/*!40000 ALTER TABLE `r_team_mrx` DISABLE KEYS */;

INSERT INTO `r_team_mrx` (`t_ID`, `x_ID`)
VALUES
	(1,1),
	(2,1),
	(2,2);

/*!40000 ALTER TABLE `r_team_mrx` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle r_team_riddle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_riddle`;

CREATE TABLE `r_team_riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'FK riddle ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `state` enum('LOCKED','UNLOCKED','SOLVED') NOT NULL DEFAULT 'LOCKED' COMMENT 'riddle state',
  `solved_correct` int(11) DEFAULT NULL COMMENT 'if riddle was solved correct',
  `img_ID` varchar(255) NOT NULL DEFAULT '' COMMENT 'team img of riddle',
  PRIMARY KEY (`r_ID`,`t_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_riddle` WRITE;
/*!40000 ALTER TABLE `r_team_riddle` DISABLE KEYS */;

INSERT INTO `r_team_riddle` (`r_ID`, `t_ID`, `state`, `solved_correct`, `img_ID`)
VALUES
	(1,2,'UNLOCKED',NULL,'0');

/*!40000 ALTER TABLE `r_team_riddle` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle r_team_station
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_station`;

CREATE TABLE `r_team_station` (
  `rts_ID` int(11) NOT NULL AUTO_INCREMENT,
  `s_ID` int(11) NOT NULL COMMENT 'FK station ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'station capture time',
  `img_ID` varchar(255) NOT NULL DEFAULT '' COMMENT 'team img of station',
  PRIMARY KEY (`rts_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_station` WRITE;
/*!40000 ALTER TABLE `r_team_station` DISABLE KEYS */;

INSERT INTO `r_team_station` (`rts_ID`, `s_ID`, `t_ID`, `timestamp`, `img_ID`)
VALUES
	(1,1,3,'2016-12-31 17:19:25','1'),
	(2,2,2,'2016-12-31 17:19:28','2'),
	(3,3,3,'2016-12-31 17:19:31','3'),
	(4,4,4,'2016-12-31 17:19:34','4'),
	(5,5,1,'2016-12-31 17:20:09','6'),
	(6,6,4,'2017-01-04 16:59:39','0'),
	(7,6,3,'2017-01-04 19:41:46','0'),
	(8,7,4,'2017-01-04 22:42:32','capture_s7_t4_1483566152483'),
	(9,7,2,'2017-01-04 22:44:01','capture_s7_t2_1483566240575'),
	(10,6,2,'2017-01-05 21:56:31','capture_s6_t2_1483649791849'),
	(11,6,4,'2017-01-05 22:30:12','capture_s6_t4_1483651812600'),
	(12,7,1,'2017-01-07 21:23:19','capture_s7_t1_1483820598640'),
	(13,7,4,'2017-01-07 21:24:06','capture_s7_t4_1483820646151'),
	(14,7,4,'2017-01-07 21:25:03','capture_s7_t4_1483820702745'),
	(15,7,2,'2017-01-07 22:51:07','capture_s7_t2_1483825867086'),
	(16,7,2,'2017-01-07 22:55:29','capture_s7_t2_1483826128702'),
	(17,7,2,'2017-01-07 22:56:29','capture_s7_t2_1483826189358'),
	(18,9,4,'2017-01-11 20:23:36','capture_s9_t4_1484162616844'),
	(19,6,2,'2017-01-13 17:34:35','capture_s6_t1_1484325130050'),
	(20,6,1,'2017-01-13 18:23:18','capture_s6_t1_1484328198750'),
	(21,14,2,'2017-01-13 18:32:44','capture_s14_t2_1484328763965'),
	(22,12,4,'2017-01-13 19:19:50','capture_s12_t4_1484331590817'),
	(23,9,2,'2017-01-15 17:55:49','capture_s9_t2_1484499349221'),
	(24,7,4,'2017-01-15 20:13:10','capture_s7_t4_1484507589998');

/*!40000 ALTER TABLE `r_team_station` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle riddle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `riddle`;

CREATE TABLE `riddle` (
  `r_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'riddle ID',
  `pos_lat` double DEFAULT NULL COMMENT 'riddle latitude',
  `pos_long` double DEFAULT NULL COMMENT 'riddle longitude',
  `question` varchar(5000) NOT NULL DEFAULT '' COMMENT 'riddle question',
  `dep_ID` int(11) DEFAULT NULL COMMENT 'dependency ID',
  `answer` varchar(255) DEFAULT NULL COMMENT 'riddle answer',
  `type` enum('SINGLE','MULTI') NOT NULL DEFAULT 'SINGLE' COMMENT 'type of riddle',
  `points` int(11) NOT NULL COMMENT 'riddle points',
  `answer_required` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'if text answer is required',
  `image_required` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'if an image is required',
  PRIMARY KEY (`r_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `riddle` WRITE;
/*!40000 ALTER TABLE `riddle` DISABLE KEYS */;

INSERT INTO `riddle` (`r_ID`, `pos_lat`, `pos_long`, `question`, `dep_ID`, `answer`, `type`, `points`, `answer_required`, `image_required`)
VALUES
	(1,47.499874114990234,8.732152938842773,'Wieviele Bänkli gibt es im Vögeli Park? (Lindengutpark)',NULL,'18','MULTI',20,1,0),
	(2,47.50304412841797,8.729138374328613,'Wieviele Tritte hat die Terrasse vom Münzkabinett?',1,'3','MULTI',30,1,0),
	(3,NULL,NULL,'Mache einen Handstand mit einem Elefanten auf dem Rücken.',NULL,'','SINGLE',7,1,0),
	(4,47.505332946777344,8.727124214172363,'Wieviele Räder hat das Gefährt?',NULL,'12','MULTI',20,1,0);

/*!40000 ALTER TABLE `riddle` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle station
# ------------------------------------------------------------

DROP TABLE IF EXISTS `station`;

CREATE TABLE `station` (
  `s_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK station ID',
  `pos_lat` double NOT NULL COMMENT 'station latitude',
  `pos_long` double NOT NULL COMMENT 'station longitude',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'station name',
  `description` varchar(1000) NOT NULL DEFAULT '' COMMENT 'station description',
  PRIMARY KEY (`s_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;

INSERT INTO `station` (`s_ID`, `pos_lat`, `pos_long`, `name`, `description`)
VALUES
	(1,47.499027252197266,8.728534698486328,'Chileplatz','Platz vor Stadtkirche'),
	(2,47.498722076416016,8.730570793151855,'Holzmaa','Er war mal hier'),
	(3,47.50092315673828,8.725961685180664,'Ufos','Aliens auf dem Merkurplatz'),
	(4,47.51821517944336,8.71927261352539,'Warzenbunker','Auch zum Einkaufen geeignet'),
	(5,47.494606018066406,8.712735176086426,'Diviko WG','Betreutes Wohnen für altgediente Divikonianer'),
	(6,47.494299,8.716552,'Technopark','Schaffä schaffä'),
	(7,47.505065917969,8.7183294296265,'Buon Gusto','Mmmh Pizza'),
	(9,47.5030431,8.737323,'o19','ounünzäh'),
	(10,47.488799,8.7335078,'Es Reh!','Hesch es gseh?!'),
	(11,47.5015087,8.7432095,'Chläbige Egge','28 limigi Eggä'),
	(12,47.494746,8.717842,'Chrafti','Was isch looos?'),
	(13,47.49552,8.716337,'Farbikk','Schaffä, schaffä, Loki baue'),
	(14,47.494497,8.716762,'Höck','');

/*!40000 ALTER TABLE `station` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle team
# ------------------------------------------------------------

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `t_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'team ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'team name',
  `hash` varchar(100) NOT NULL DEFAULT '' COMMENT 'team hash',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT 'team score',
  `color` varchar(255) NOT NULL DEFAULT '' COMMENT 'team color',
  `see_mrx_until` timestamp NULL DEFAULT NULL COMMENT 'time until they see mrxs',
  PRIMARY KEY (`t_ID`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;

INSERT INTO `team` (`t_ID`, `name`, `hash`, `score`, `color`, `see_mrx_until`)
VALUES
	(1,'Team Rot','111',300,'red',NULL),
	(2,'Team Grün','222',465,'green','2017-01-05 22:50:13'),
	(3,'Team Blau','333',300,'blue',NULL),
	(4,'Team Gelb','444',435,'yellow','2017-01-05 22:50:13');

/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle teamposition
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teamposition`;

CREATE TABLE `teamposition` (
  `tp_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK team position ID',
  `team_lat` double NOT NULL COMMENT 'team latitude',
  `team_long` double NOT NULL COMMENT 'team longitude',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `player` varchar(255) NOT NULL DEFAULT '' COMMENT 'player info',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'position timestamp',
  PRIMARY KEY (`tp_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `teamposition` WRITE;
/*!40000 ALTER TABLE `teamposition` DISABLE KEYS */;

INSERT INTO `teamposition` (`tp_ID`, `team_lat`, `team_long`, `t_ID`, `player`, `timestamp`)
VALUES
	(1,47.48493194580078,8.761857986450195,4,'Hugo','2016-12-29 15:45:13'),
	(2,47.483360290527344,8.760130882263184,4,'Hugo','2016-12-29 15:47:13'),
	(3,47.48478698730469,8.757975578308105,4,'Stei','2016-12-29 15:47:36'),
	(4,47.498043060302734,8.760632514953613,3,'Hund','2016-12-29 15:48:47'),
	(24200,47.5029869,8.737825,2,'asd','2017-01-16 19:15:56'),
	(24201,47.5029869,8.737825,2,'asd','2017-01-16 19:15:56');

/*!40000 ALTER TABLE `teamposition` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `u_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'user ID',
  `username` varchar(100) NOT NULL DEFAULT '' COMMENT 'username',
  `hash` varchar(100) NOT NULL DEFAULT '' COMMENT 'backend user hash',
  PRIMARY KEY (`u_ID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`u_ID`, `username`, `hash`)
VALUES
	(2,'admin','admin');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
