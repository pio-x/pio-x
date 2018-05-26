# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27-0ubuntu1)
# Datenbank: piox_live
# Erstellt am: 2017-04-01 11:28:38 +0000
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
	('game_is_running','0'),
	('home_location_lat','47.499163'),
	('home_location_long','8.721871'),
	('home_location_title','Startpunkt'),
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
  `type` enum('RIDDLE','STATION','MRX','PROFILE','OTHER') NOT NULL DEFAULT 'OTHER' COMMENT 'log type',
  `FK_ID` int(11) NOT NULL COMMENT 'FK ID of type',
  `t_ID` int(11) DEFAULT NULL COMMENT 'team ID',
  `img_ID` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`l_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;

INSERT INTO `log` (`l_ID`, `timestamp`, `text`, `type`, `FK_ID`, `t_ID`, `img_ID`)
VALUES
	(1,'2017-04-01 13:08:39','Mrx. 4 sagt: richtung töss','MRX',0,4,''),
	(2,'2017-04-01 13:12:08','Mrx. 3 sagt: Waaaaaaah','MRX',0,3,''),
	(3,'2017-04-01 13:12:32','Mrx. 2 sagt: Ich sehe einen mr X','MRX',0,2,''),
	(4,'2017-04-01 13:21:31','Mrx. 1 sagt: Salzhaus','MRX',0,1,'');

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
	(1,'Mrx. 1','brauche56einzahlte'),
	(2,'Mrx. 2','verratend16Physikers'),
	(3,'Mrx. 3','operativer16unmaskiert'),
	(4,'Mrx. 4','zerrtet18baumelnder'),
	(5,'Mrx. 5','bildenden49Honecker'),
	(6,'Mrx. 6','waegbaren31Vierlingen');

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
	(1,47.497315687361,8.7224835716903,4,'2017-04-01 13:08:39','richtung töss'),
	(2,47.4973263,8.7220024,3,'2017-04-01 13:12:08','Waaaaaaah'),
	(3,47.49739152058,8.7218392885299,2,'2017-04-01 13:12:32','Ich sehe einen mr X'),
	(4,47.497298517359,8.7219599719768,1,'2017-04-01 13:21:31','Salzhaus');

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
	(1,'144822',400,0,1),
	(2,'184300',400,0,1),
	(3,'127522',400,0,1),
	(4,'174087',400,0,1),
	(5,'162129',400,0,1),
	(6,'138446',400,0,1),
	(7,'179429',400,0,1),
	(8,'109226',400,0,1),
	(9,'156831',400,0,1),
	(10,'125555',400,0,1),
	(11,'188182',400,0,1),
	(12,'178790',400,0,1),
	(13,'199564',400,0,1),
	(14,'188525',400,0,1),
	(15,'159817',400,0,1),
	(16,'198677',400,0,1),
	(17,'192657',400,0,1),
	(18,'135933',400,0,1),
	(19,'166248',400,0,1),
	(20,'177775',400,0,1),
	(21,'107423',400,0,1),
	(22,'184605',400,0,1),
	(23,'151200',400,0,1),
	(24,'172340',400,0,1),
	(25,'126881',400,0,1),
	(26,'179255',400,0,1),
	(27,'177262',400,0,1),
	(28,'127334',400,0,1),
	(29,'183630',400,0,1),
	(30,'144873',400,0,1),
	(31,'114071',400,0,1),
	(32,'132278',400,0,1),
	(33,'160764',400,0,1),
	(34,'176666',400,0,1),
	(35,'123033',400,0,1),
	(36,'180774',400,0,1),
	(37,'114131',400,0,1),
	(38,'110406',400,0,1),
	(39,'103945',400,0,1),
	(40,'155106',400,0,1),
	(41,'115481',400,0,1),
	(42,'183761',400,0,1),
	(43,'122888',400,0,1),
	(44,'195016',400,0,1),
	(45,'163297',400,0,1),
	(46,'111720',400,0,1),
	(47,'138611',400,0,1),
	(48,'120603',400,0,1),
	(49,'131774',400,0,1),
	(50,'141893',400,0,1),
	(51,'150472',400,0,1),
	(52,'147014',400,0,1),
	(53,'176027',400,0,1),
	(54,'112492',400,0,1),
	(55,'185179',400,0,1),
	(56,'186098',400,0,1),
	(57,'113350',400,0,1),
	(58,'106653',400,0,1),
	(59,'186385',400,0,1),
	(60,'142835',400,0,1),
	(61,'139605',400,0,2),
	(62,'180135',400,0,2),
	(63,'181591',400,0,2),
	(64,'169494',400,0,2),
	(65,'124455',400,0,2),
	(66,'137563',400,0,2),
	(67,'120754',400,0,2),
	(68,'107861',400,0,2),
	(69,'125448',400,0,2),
	(70,'180967',400,0,2),
	(71,'191335',400,0,2),
	(72,'113183',400,0,2),
	(73,'197406',400,0,2),
	(74,'188492',400,0,2),
	(75,'102311',400,0,2),
	(76,'147264',400,0,2),
	(77,'109315',400,0,2),
	(78,'131884',400,0,2),
	(79,'156886',400,0,2),
	(80,'154349',400,0,2),
	(81,'139290',400,0,2),
	(82,'179111',400,0,2),
	(83,'158856',400,0,2),
	(84,'123800',400,0,2),
	(85,'180353',400,0,2),
	(86,'193971',400,0,2),
	(87,'194158',400,0,2),
	(88,'173529',400,0,2),
	(89,'130529',400,0,2),
	(90,'150777',400,0,2),
	(91,'155478',400,0,2),
	(92,'183256',400,0,2),
	(93,'198558',400,0,2),
	(94,'133211',400,0,2),
	(95,'185351',400,0,2),
	(96,'116773',400,0,2),
	(97,'187574',400,0,2),
	(98,'113452',400,0,2),
	(99,'177433',400,0,2),
	(100,'194771',400,0,2),
	(101,'117857',400,0,2),
	(102,'121064',400,0,2),
	(103,'176388',400,0,2),
	(104,'108980',400,0,2),
	(105,'142445',400,0,2),
	(106,'196600',400,0,2),
	(107,'182631',400,0,2),
	(108,'172421',400,0,2),
	(109,'196708',400,0,2),
	(110,'179453',400,0,2),
	(111,'171881',400,0,2),
	(112,'195746',400,0,2),
	(113,'116755',400,0,2),
	(114,'158783',400,0,2),
	(115,'177195',400,0,2),
	(116,'139462',400,0,2),
	(117,'108383',400,0,2),
	(118,'122732',400,0,2),
	(119,'120891',400,0,2),
	(120,'100293',400,0,3),
	(121,'125302',400,0,3),
	(122,'145722',400,0,3),
	(123,'128771',400,0,3),
	(124,'165700',400,0,3),
	(125,'149098',400,0,3),
	(126,'169812',400,0,3),
	(127,'135306',400,0,3),
	(128,'186483',400,0,3),
	(129,'128963',400,0,3),
	(130,'163634',400,0,3),
	(131,'195067',400,0,3),
	(132,'121601',400,0,3),
	(133,'155948',400,0,3),
	(134,'129778',400,0,3),
	(135,'120382',400,0,3),
	(136,'164496',400,0,3),
	(137,'162299',400,0,3),
	(138,'118127',400,0,3),
	(139,'101671',400,0,3),
	(140,'150006',400,0,3),
	(141,'192066',400,0,3),
	(142,'127153',400,0,3),
	(143,'117244',400,0,3),
	(144,'164143',400,0,3),
	(145,'118374',400,0,3),
	(146,'117763',400,0,3),
	(147,'142049',400,0,3),
	(148,'137572',400,0,3),
	(149,'168462',400,0,3),
	(150,'111712',400,0,3),
	(151,'150048',400,0,3),
	(152,'167818',400,0,3),
	(153,'169355',400,0,3),
	(154,'126659',400,0,3),
	(155,'152274',400,0,3),
	(156,'121868',400,0,3),
	(157,'188026',400,0,3),
	(158,'173983',400,0,3),
	(159,'192349',400,0,3),
	(160,'177545',400,0,3),
	(161,'143410',400,0,3),
	(162,'194061',400,0,3),
	(163,'103535',400,0,3),
	(164,'146671',400,0,3),
	(165,'118492',400,0,3),
	(166,'156653',400,0,3),
	(167,'137807',400,0,3),
	(168,'116335',400,0,3),
	(169,'162892',400,0,3),
	(170,'118186',400,0,3),
	(171,'115899',400,0,3),
	(172,'153479',400,0,3),
	(173,'146600',400,0,3),
	(174,'102130',400,0,3),
	(175,'188161',400,0,3),
	(176,'157435',400,0,3),
	(177,'142998',400,0,3),
	(178,'177308',400,0,3),
	(179,'158892',400,0,3),
	(180,'193813',400,0,3),
	(181,'129762',400,0,4),
	(182,'166492',400,0,4),
	(183,'191147',400,0,4),
	(184,'127957',400,0,4),
	(185,'101290',400,0,4),
	(186,'141289',400,0,4),
	(187,'141919',400,0,4),
	(188,'172348',400,0,4),
	(189,'171095',400,0,4),
	(190,'105591',400,0,4),
	(191,'121215',400,0,4),
	(192,'102736',400,0,4),
	(193,'128125',400,0,4),
	(194,'113566',400,0,4),
	(195,'166929',400,0,4),
	(196,'129654',400,0,4),
	(197,'162143',400,0,4),
	(198,'112770',400,0,4),
	(199,'145651',400,0,4),
	(200,'111836',400,0,4),
	(201,'125921',400,0,4),
	(202,'137952',400,0,4),
	(203,'130472',400,0,4),
	(204,'179867',400,0,4),
	(205,'184921',400,0,4),
	(206,'182781',400,0,4),
	(207,'114053',400,0,4),
	(208,'123368',400,0,4),
	(209,'112147',400,0,4),
	(210,'126170',400,0,4),
	(211,'153121',400,0,4),
	(212,'197437',400,0,4),
	(213,'172748',400,0,4),
	(214,'175394',400,0,4),
	(215,'119847',400,0,4),
	(216,'148152',400,0,4),
	(217,'108989',400,0,4),
	(218,'150021',400,0,4),
	(219,'132512',400,0,4),
	(220,'112679',400,0,4),
	(221,'114652',400,0,4),
	(222,'185846',400,0,4),
	(223,'112346',400,0,4),
	(224,'121054',400,0,4),
	(225,'126092',400,0,4),
	(226,'168667',400,0,4),
	(227,'105394',400,0,4),
	(228,'129071',400,0,4),
	(229,'198635',400,0,4),
	(230,'119668',400,0,4),
	(231,'197962',400,0,4),
	(232,'120091',400,0,4),
	(233,'133304',400,0,4),
	(234,'152961',400,0,4),
	(235,'120067',400,0,4),
	(236,'195868',400,0,4),
	(237,'159715',400,0,4),
	(238,'110250',400,0,4),
	(239,'121931',400,0,4),
	(240,'166770',400,0,4),
	(241,'175284',400,0,5),
	(242,'197105',400,0,5),
	(243,'186466',400,0,5),
	(244,'115496',400,0,5),
	(245,'185077',400,0,5),
	(246,'124623',400,0,5),
	(247,'154166',400,0,5),
	(248,'160607',400,0,5),
	(249,'199585',400,0,5),
	(250,'159646',400,0,5),
	(251,'100086',400,0,5),
	(252,'166913',400,0,5),
	(253,'130652',400,0,5),
	(254,'186099',400,0,5),
	(255,'131428',400,0,5),
	(256,'139085',400,0,5),
	(257,'159126',400,0,5),
	(258,'179893',400,0,5),
	(259,'139684',400,0,5),
	(260,'196074',400,0,5),
	(261,'197635',400,0,5),
	(262,'164650',400,0,5),
	(263,'193516',400,0,5),
	(264,'148601',400,0,5),
	(265,'124892',400,0,5),
	(266,'124739',400,0,5),
	(267,'117333',400,0,5),
	(268,'123026',400,0,5),
	(269,'147912',400,0,5),
	(270,'127595',400,0,5),
	(271,'188366',400,0,5),
	(272,'187278',400,0,5),
	(273,'196845',400,0,5),
	(274,'137754',400,0,5),
	(275,'123039',400,0,5),
	(276,'104049',400,0,5),
	(277,'172646',400,0,5),
	(278,'126820',400,0,5),
	(279,'146197',400,0,5),
	(280,'143334',400,0,5),
	(281,'105634',400,0,5),
	(282,'145184',400,0,5),
	(283,'103799',400,0,5),
	(284,'167950',400,0,5),
	(285,'173240',400,0,5),
	(286,'150823',400,0,5),
	(287,'115900',400,0,5),
	(288,'137322',400,0,5),
	(289,'150809',400,0,5),
	(290,'128162',400,0,5),
	(291,'110123',400,0,5),
	(292,'193636',400,0,5),
	(293,'114044',400,0,5),
	(294,'128835',400,0,5),
	(295,'103340',400,0,5),
	(296,'122622',400,0,5),
	(297,'191788',400,0,5),
	(298,'178482',400,0,5),
	(299,'186405',400,0,5),
	(300,'199719',400,0,5),
	(301,'196448',400,0,5),
	(302,'153724',400,0,5),
	(303,'136638',400,0,5),
	(304,'111551',400,0,5),
	(305,'175731',400,0,5),
	(306,'157563',400,0,5),
	(307,'165880',400,0,5),
	(308,'178669',400,0,5),
	(309,'129665',400,0,5),
	(310,'140915',400,0,5),
	(311,'127895',400,0,5),
	(312,'123897',400,0,5),
	(313,'105270',400,0,5),
	(314,'123683',400,0,5),
	(315,'121264',400,0,5),
	(316,'174249',400,0,5),
	(317,'137946',400,0,5),
	(318,'140776',400,0,5),
	(319,'157856',400,0,5),
	(320,'166369',400,0,5),
	(321,'109070',400,0,6),
	(322,'177687',400,0,6),
	(323,'161252',400,0,6),
	(324,'188128',400,0,6),
	(325,'125851',400,0,6),
	(326,'180760',400,0,6),
	(327,'149405',400,0,6),
	(328,'102070',400,0,6),
	(329,'186160',400,0,6),
	(330,'181160',400,0,6),
	(331,'125490',400,0,6),
	(332,'199407',400,0,6),
	(333,'147747',400,0,6),
	(334,'107242',400,0,6),
	(335,'115644',400,0,6),
	(336,'140484',400,0,6),
	(337,'125580',400,0,6),
	(338,'152543',400,0,6),
	(339,'196293',400,0,6),
	(340,'120103',400,0,6),
	(341,'136720',400,0,6),
	(342,'196879',400,0,6),
	(343,'175362',400,0,6),
	(344,'176049',400,0,6),
	(345,'196418',400,0,6),
	(346,'182367',400,0,6),
	(347,'109607',400,0,6),
	(348,'152164',400,0,6),
	(349,'118772',400,0,6),
	(350,'102919',400,0,6),
	(351,'108367',400,0,6),
	(352,'179510',400,0,6),
	(353,'110793',400,0,6),
	(354,'171789',400,0,6),
	(355,'115779',400,0,6),
	(356,'176828',400,0,6),
	(357,'189855',400,0,6),
	(358,'136953',400,0,6),
	(359,'134425',400,0,6),
	(360,'161679',400,0,6),
	(361,'155529',400,0,6),
	(362,'112002',400,0,6),
	(363,'135837',400,0,6),
	(364,'118277',400,0,6),
	(365,'102029',400,0,6),
	(366,'100634',400,0,6),
	(367,'169505',400,0,6),
	(368,'173579',400,0,6),
	(369,'145427',400,0,6),
	(370,'134578',400,0,6),
	(371,'140529',400,0,6),
	(372,'165855',400,0,6),
	(373,'155719',400,0,6),
	(374,'123596',400,0,6),
	(375,'190317',400,0,6),
	(376,'146159',400,0,6),
	(377,'158682',400,0,6),
	(378,'176880',400,0,6),
	(379,'118413',400,0,6),
	(380,'187917',400,0,6);

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



# Export von Tabelle r_team_points
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_points`;

CREATE TABLE `r_team_points` (
  `rtp_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_ID` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `type` enum('STATION','RIDDLE','PASSCODE','ADMIN') NOT NULL DEFAULT 'STATION',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `FK_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rtp_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Export von Tabelle r_team_riddle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_riddle`;

CREATE TABLE `r_team_riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'FK riddle ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `state` enum('LOCKED','UNLOCKED','SOLVED') NOT NULL DEFAULT 'LOCKED' COMMENT 'riddle state',
  `img_ID` varchar(255) NOT NULL DEFAULT '' COMMENT 'team img of riddle',
  PRIMARY KEY (`r_ID`,`t_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



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



# Export von Tabelle riddle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `riddle`;

CREATE TABLE `riddle` (
  `r_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'riddle ID',
  `pos_lat` double DEFAULT NULL COMMENT 'riddle latitude',
  `pos_long` double DEFAULT NULL COMMENT 'riddle longitude',
  `title` varchar(255) NOT NULL DEFAULT '',
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

INSERT INTO `riddle` (`r_ID`, `pos_lat`, `pos_long`, `title`, `question`, `dep_ID`, `answer`, `type`, `points`, `answer_required`, `image_required`)
VALUES
	(5,0,0,'Schlange','Die Schlange ist wild geworden. Damit wir sie wieder zahm kriegen, müssen wir die Mami-Schlange imitieren. Macht eine Polonaise mit mind. 15 Leuten und macht ein Foto',0,'','SINGLE',150,0,1),
	(6,47.495411312183,8.7184184789658,'Känguru','Das Känguru wurde leider schon verarbeitet. Dennoch möchte der Zirkus-Direktor es wieder zurückkaufen, denn es ist sein «Great Känguru». Wie teuer (Franken, gerundet) ist es in der Menükarte des Outbacks (Kangarooer)?',NULL,'32','SINGLE',100,1,0),
	(8,0,0,'Wal','Seit den Wahlen in den USA haben die Wale einen schlechten Ruf. Deshalb müsst ihr für die Wale werben. Macht ein Foto davon.',0,'','SINGLE',150,0,1),
	(9,0,0,'Faultier','Das Faultier Fuulio verfault seit dem Schiffbruch auf einem Baum. Um ihn davon zu überzeugen diesen wieder zu verlassen müsst ihr euch seinen Gegebenheiten anpassen und ein Foto machen wie eure gesamte Gruppe Kopfüber in einem Baum hängt.',0,'','SINGLE',150,0,1),
	(10,0,0,'Storch','Ralf der Storch hat sich nach dem Schiffsbruch umschulen lassen und bringt den Menschen jetzt ihre Kinder. Macht ein High-5 mit einem Baby und schickt ein Foto davon.',0,'','SINGLE',150,0,1),
	(11,0,0,'Maulwurf','Maxi der Maulwurf hat sich nach dem Unglück vergraben und ist seither unterirdisch unterwegs. Da niemand genau weiss, wo er sich aufhält müsst ihr ihn suchen – an einem Ort wo die Erde offen ist. (z.B. eine Baustelle) Jetzt müsst ihr von oben in die Erde reingucken – dafür müsst ihr alle einen Handstand machen, um besser mit ihm kommunizieren zu können. Macht ein Foto davon.',NULL,'','SINGLE',150,0,1),
	(12,47.500184515667,8.7185525894165,'Giraffe','Um die Giraffe wieder zu finden, müsst ihr Winterthur aus den Augen des Giraffen anschauen. Daher müsst ihr zum Sulzerhochhaus. Wie viele Stockwerke hat das Sulzerhochhaus?',NULL,'26','SINGLE',100,1,0),
	(13,47.496110829274,8.7213742733002,'Gorilla','Der Gorilla ist auf Partnersuche und verbreitet seinen Brunftschrei. Auf der einen Seite der Geleise steht etwas mit Kreide auf den Boden geschrieben. Jemand der Gruppe muss dort rüber gehen und mit Gorilla-Gesten dieses Wort über die Bahngeleise rufen. Die anderen müssen es verstehen. Als Beweis dient ein Foto der restlichen Gruppe vom einen Gorilla-Rufer.',0,NULL,'SINGLE',150,0,1),
	(14,47.495791879632,8.7478852272034,'Pingu','Die Pingus lieben die Kälte, daher sind sie bei der Eishalle. Damit sie sich wieder zu uns zurücktrauen, müssen wir mit mind. 5 fremden Leuten ein Pingu vor der Eishalle machen und ein Foto davon schiessen.',0,NULL,'SINGLE',150,0,1),
	(15,47.498720344488,8.7262558937073,'Kiwi (Serie 1/7) 350 Punkte Total','Der Kiwi Maxx hat sich im Kiwi Kino im Popcorn verkrochen. Um ihn wieder herauszuholen müsst ihr eine bekannte Filmszene Nachspielen. Bei jedem Rätsel müsst ihr ein Foto der Story hochladen und erhaltet dafür Punkte. Total Punkte: 500',NULL,NULL,'MULTI',50,0,1),
	(16,0,0,'Kiwi (Serie 2/7)','Foto 2',15,'','MULTI',50,0,1),
	(17,0,0,'Kiwi (Serie 3/7)','Foto 3',16,'','MULTI',50,0,1),
	(18,0,0,'Kiwi (Serie 4/7)','Foto 4',17,'','MULTI',50,0,1),
	(19,0,0,'Kiwi (Serie 5/7)','Foto 5',18,'','MULTI',50,0,1),
	(20,0,0,'Kiwi (Serie 6/7)','Foto 6',19,'','MULTI',50,0,1),
	(21,0,0,'Kiwi (Serie 7/7)','Foto 7',20,'','MULTI',200,0,1),
	(22,47.499938073871,8.7233591079712,'Elefant (Serie 1/5) 250 Punkte Total','Der Elefant hat sein Foto-Tagebuch beim Schiffbruch verloren und ist sehr vergesslich. Daher müssen wir ihm eine Foto-Love-Story machen, wie er mit dem Nilpferd Aphrodite zusammengefunden hat. \nDie Foto-Love-Story führt dich durch die Stadt bis zur Stadtkirche. Die erste Szene spielt beim Bahnhof. Total Punkte: 400',NULL,NULL,'MULTI',50,0,1),
	(23,47.500633906552,8.7255907058716,'Elefant (Serie 2/5)','Die nächste Szene spielt beim Manor.',22,'','MULTI',50,0,1),
	(24,47.500800615096,8.7281227111816,'Elefant (Serie 3/5)','Weiter gehts mit der Foto-Love-Story im Stadpark',23,'','MULTI',50,0,1),
	(25,47.499234983566,8.7311482429504,'Elefant (Serie 4/5)','Wir sind im Oberen Graben, die Story neigt sich dem Ende zu...',24,'','MULTI',50,0,1),
	(26,47.49895954356,8.7290561199188,'Elefant (Serie 5/5)','Epische Abschluss Kussszene bei der Stadtkirche ;)',25,'','MULTI',200,0,1),
	(27,47.507365964198,8.7185847759247,'Delfin','Wieviele Delfine siehst du an der Wand springen?',NULL,'6','SINGLE',100,1,0),
	(28,47.494501563579,8.7140035629272,'test','frage',NULL,'','SINGLE',50,0,1);

/*!40000 ALTER TABLE `riddle` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle station
# ------------------------------------------------------------

DROP TABLE IF EXISTS `station`;

CREATE TABLE `station` (
  `s_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK station ID',
  `pos_lat` double NOT NULL COMMENT 'station latitude',
  `pos_long` double NOT NULL COMMENT 'station longitude',
  `points` int(11) NOT NULL DEFAULT '10',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'station name',
  `description` varchar(1000) NOT NULL DEFAULT '' COMMENT 'station description',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`s_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;

INSERT INTO `station` (`s_ID`, `pos_lat`, `pos_long`, `points`, `name`, `description`, `enabled`)
VALUES
	(1,47.499027252197,8.7285346984863,10,'Stadtchile','Chile ide Altstadt',1),
	(2,47.498758398958245,8.731134831905365,10,'Holzmaa','Er war mal hier',1),
	(3,47.50092383411447,8.726577758789062,10,'Ufos','Aliens auf dem Merkurplatz',1),
	(4,47.51821517944336,8.71927261352539,10,'Warzenbunker','Auch zum Einkaufen geeignet',1),
	(5,47.494706674598476,8.713542222976685,10,'Diviko WG','Betreutes Wohnen für altgediente Divikonianer',1),
	(7,47.505065917969,8.7183294296265,10,'Buon Gusto','Mmmh Pizza',1),
	(9,47.503076496184185,8.737961053848267,10,'o19','ounünzäh',1),
	(10,47.48857875113353,8.733025789260864,10,'Es Reh!','Hesch es gseh?!',1),
	(11,47.50191138785749,8.743824362754822,10,'Chläbige Egge','28 limigi Eggä',1),
	(12,47.494746,8.717842,10,'Chrafti','Was isch looos?',1),
	(13,47.49552,8.716337,10,'Fabrikk','Schaffä, schaffä, Loki baue',1),
	(15,47.5010999,8.7354922,10,'Kobold\'s Versteck','Fleissige Kobolde arbeiten hart',1),
	(16,47.4914836,8.736828,10,'Herz Jesu','',1),
	(17,47.498473895819,8.7321674823761,10,'La Cyma','',1),
	(18,47.498347046788,8.7311053276062,10,'Brunne im Grabe','',1),
	(19,47.498354295313,8.7293189764023,10,'Albani','badum\'tss',1),
	(20,47.504555041217,8.7435507774353,10,'Bäumli 1','Bäum mit Ussicht!',1),
	(21,47.502105272374,8.7395972013474,10,'Alts Bahnhüsli im Innere Lind','Da hets mal e Barriere gha ...',1),
	(22,47.499869214927,8.7350749969482,10,'Vögelipark Brunne','Brunne im Lindeguetpark',1),
	(23,47.499659013382,8.7345841526985,10,'Voliere im Vögelipark','Genau drum seit mer em Lindeguetpark ebe anders ...',1),
	(24,47.499945322176,8.7317617982626,10,'Sandwich','Feini grossi Sandwich',1),
	(25,47.500594041387,8.731429874897,10,'Stadthus Brunne','Ideal für Wasserschlachte im Summer!',1),
	(26,47.500945578617,8.7288951873779,10,'Stadtpark Brunne','Brunne im Stadtpark',1),
	(27,47.499664449639,8.7336346507072,10,'Pauseplätzli','Pauseplätzli im Vögelipark',1),
	(28,47.497397481456,8.7293243408203,10,'Technikum Hauptgebäude','Hauptgebäude ZHAW - Departement T',1),
	(29,47.497379359813,8.7283882498741,10,'Technikum Physikgebäude','Physikgebäude ZHAW - Departement T',1),
	(31,47.497190894357,8.7261754274368,10,'Veloweg','De wahrschinlich tüürschti Veloweg vo de Schweiz',1),
	(32,47.497415603092,8.7221360206604,10,'Salzhaus','Da steppt de Bär',1),
	(33,47.498945046677,8.7238097190857,10,'Metallpilz','Busbahnhof Winterthur',1),
	(34,47.498926925569,8.7296703457832,10,'Strings','Wenn nüme ali Saite hesch',1),
	(35,47.499590154072,8.7311509251595,10,'Springbrunne im Grabe','Spring Brunne, spring!',1),
	(36,47.499755053848,8.7265482544899,10,'Casiontheater','Früehner me Glück, hüt macheds Theater',1),
	(37,47.500333105015,8.7290292978287,10,'Am Öski sind Bilder','Da het de Oskar Reinhart vil gsammled',1),
	(38,47.50092021003,8.7314110994339,10,'Stadthuus','So mit Statue uf em Dach und so ... het de Semper mal plant',1),
	(39,47.500586793172,8.7338760495186,10,'Hässlichi Kunscht','Die wohl hässlichschti Skulptur vo Winti',1),
	(40,47.503130855195,8.7314674258232,10,'LIeblingsbaum','De wohl schönschti Baum vo Winti',1),
	(41,47.502951470246,8.7310275435448,10,'Münzkabinett','Vili rundi Sache zum aluege',1),
	(42,47.503958917164,8.7303167581558,10,'Bezirksgricht','Wo Recht gsproche wierd',1),
	(43,47.50439196844,8.7306010723114,10,'Gfängnis','Ja au das git\'s in Winti, au wenn chum eine weiss wos isch',1),
	(44,47.506934034229,8.7287932634354,10,'Kantonspital Winterthur','Für grössere Wehwehs',1),
	(45,47.507606220639,8.7312930822372,10,'Haldeguet Chreisel','Besser drum ume als drüber',1),
	(46,47.505988247939,8.7342140078545,10,'Musigschuel','S\'wohl friedlischte Pärkli in Winti',1),
	(47,47.505413882813,8.7348684668541,10,'Musigschuel Open Air Bühne','Da macheds emal dusse lärm',1),
	(48,47.505526219704,8.7338465452194,10,'Musigschuelpark','De heisst offiziell eigentlich Rychebergpark',1),
	(49,47.504721737309,8.7366038560867,10,'Kanti Rycheberg','Da wo jungi Mensche sötted schlauer werde',1),
	(50,47.504225271301,8.7395060062408,10,'Kantonschuel Lee','Nomal so es schlaus Gebäude für jungi Lüt',1),
	(51,47.503051128627,8.7402375787497,10,'Höhli','I die het mer früehner no chöne ine',1),
	(52,47.502295532185,8.7416088581085,10,'Pavillon','Schön, aber brucht wierd de glaub sälte',1),
	(53,47.501043428767,8.7463214993477,10,'Hong Kong','So het das Restaurant früehner mal gheisse',1),
	(54,47.499396260267,8.7448543310165,10,'Maag Recycling','Da chan mer so ziemlich alles entsorgä',1),
	(55,47.500342165327,8.7422230839729,10,'Recht chlises Hüsli','Sehr chli, aber nid s\'chlinschte in Winti',1),
	(56,47.504004215582,8.7335407733917,10,'Gigampfi','Hets da zwar nüme aber defür en Ping Pong Tisch',1),
	(57,47.506258215495,8.7255477905273,10,'Blaui Note','Musikalischi Gastro',1),
	(58,47.489535725682,8.7262237071991,10,'Pfadiheim Breiti','S\'Gröschte vo Winti',1),
	(59,47.489086239808,8.7275540828705,10,'Pfadiheim Schützenstand','S\'Chlinschte vo Winti',1),
	(60,47.489695219744,8.7246251106262,10,'Minigolf Breiti','Breits Minigolf ... ^^',1),
	(61,47.481063719975,8.7350106239319,10,'Eschebergturm 1','En Turm uf em Escheberg',1),
	(62,47.477318491224,8.7264168262482,10,'Bruderhaus','Der kleine Wildpark',1),
	(63,47.476861649314,8.7241744995117,10,'Wolfsgehege Bruderhaus','Hier hat es Wölfe',1),
	(64,47.476839894838,8.728187084198,10,'Wildschweine Bruderhaus','Grunz grunz',1),
	(65,47.477983534241,8.7285089492798,10,'Luchsgehege Bruderhaus','Lynx Lynx',1),
	(66,47.477998916645,8.727645277977,10,'Wisentgehege Bruderhaus','Europäische Büffel',1),
	(67,47.477209280783,8.7274521589279,10,'HIrschgehege Bruderhaus','So mit Geweih und so',1),
	(68,47.477670757728,8.7254458665848,10,'Przewalskigehege Bruderhaus','Urpferde gibts hier auch',1),
	(69,47.474620890998,8.742767572403,10,'Sternwarte Eschenberg 1','Klein aber fein',1),
	(70,47.458352586896,8.7439477443695,50,'Schloss Kyburg (5-fach Punkte)','Was hast Du hier verloren?',1),
	(71,47.495429434505,8.7413460016251,10,'Hallenbad Geiselweid','Plantsche am Schärme',1),
	(72,47.496413467201,8.74168664217,10,'Freibad Geiselweid','Plantsche im Freie',1),
	(73,47.495944105839,8.7387764453888,10,'Fotomuseum','Knips und Flash',1),
	(74,47.497076727454,8.7370705604553,10,'Adlergartenpark','Bockige Gesellschaft',1),
	(75,47.49546567913,8.7330660223961,10,'Feuerwehr Winterthur','Füürio!',1),
	(76,47.494726283824,8.7349006533623,10,'Cioa Mattebach','S\'endi vom Mattebach',1),
	(77,47.491862841028,8.7345331907272,10,'Züghuuswiese','Da verbrenneds de Böögg',1),
	(78,47.489292858792,8.7399834394455,10,'S\'Zelgli','Da isch mal e Isbahn gsi',1),
	(79,47.489713344039,8.7372368574142,10,'Mäpf','Da isch mal s\'Maitlipfadiheim gstande',1),
	(80,47.492205375002,8.7330982089043,10,'Erfrischig','Früsches Wasser under emene schöne Baum',1),
	(81,47.49750983550138,8.727355599403381,10,'Ciao Eulach','Da verschwindet sie im Undergrund',1),
	(82,47.497738519291,8.7261217832565,10,'Gugus Eulach','Da luegt sie ganz churz füre',1),
	(83,47.499191589896,8.7181690335274,10,'Sali zrugg Eulach!','Da chunnt sie wieder füre.',1),
	(84,47.499796383446,8.7182575464249,10,'Sulzer Hochhus','Das isch recht lang mal s\'höchscht Huus vo de Schweiz gsi.',1),
	(85,47.501303211647,8.7178391218185,10,'Bierkurve FCW','d\'Fankurve vom FC Winterthur',1),
	(86,47.501779111094,8.7025237083435,10,'Brüehlbergturm 1','De höchscht Turm wo mer ufe chan',1),
	(87,47.496972245406,8.7065148353577,10,'Steili Sach!','Die wohl steilschti Strass in Winti',1),
	(88,47.495045239939,8.7188422679901,10,'Skillspark','Gump, Fahr und hoffentlich nid Unfallort',1),
	(89,47.495791879632,8.7188315391541,10,'Portier','Igangslokal zum Lagerplatzareal',1),
	(90,47.494363831341,8.7185311317444,10,'Les Wagons','Esse im alte Üetlibergbähnli',1),
	(91,47.493327203433,8.7160205841064,10,'ZHAW Architektur','Architektur Departement der ZHAW',1),
	(92,47.502036416273,8.7343239784241,10,'Freimurer','Die hend da e Grosloge',1),
	(93,47.499278473961,8.7403964996338,10,'Grosses Ping Pong','Wie Ping Pong, nur chli grösser',1),
	(94,47.495458430207,8.7481641769409,10,'Eishalle Winterthur','Da spielt de EHCW',1),
	(95,47.494338459574,8.7500309944153,10,'Ehemalig Verkehrsgarte','Da hend Chind früehner glernt Velo fahre',1),
	(96,47.493758530119,8.7496984004974,10,'Beachvolley Dütweg','Fasch wie am Strand nur ohni Meer',1),
	(97,47.497479678862,8.6955070495605,10,'Freizytalag Nägelsee','Quartierzentrum Nägelsee',1),
	(98,47.499996271307,8.6881470680237,50,'Ruine Alt Wülflinge (5-fach Punkte)','In Renovation und doch sehenswert',1),
	(99,47.504790789255,8.6832118034363,10,'Minigolf Tössrain','Ja in Wülflinge gits au Minigolf',1),
	(100,47.506517835955,8.6808729171753,10,'Bahnhof Wülflingen','A de Linie nach Bülach',1),
	(101,47.512136750473,8.684955239296,10,'Badi Wülflinge','Plantsche im Freie',1),
	(102,47.511265640337,8.6992835998535,10,'Schloss Wülflinge','Nid so beidruckend wid Ruine uf em Hügel',1),
	(103,47.507289095133,8.7072175741196,10,'FC Veltheim','Da spielt und trainiert de FC Veltheim',1),
	(104,47.503641827143,8.7119328975677,10,'Eulachhalle','Halle a de Eulach',1),
	(105,47.503040256812,8.7136280536652,10,'Rennweghalle','Au a de Eulach, heisst aber anders',1),
	(106,47.501118704395,8.7146687507629,10,'Hin und Her','Da wierds eim trümlig bim zueluege',1),
	(107,47.497538622834,8.7191614508629,10,'Superblock','Da drin isch d\'Stadtverwaltig',1),
	(108,47.496241308115,8.7178015708923,10,'Halle 53','Meh als nur es Parkhus',1),
	(109,47.506736543864,8.7365341186523,10,'Schlittelweg','Wenns gnueg Schnee het, isch das en Schlittelweg',1),
	(110,47.506374174288,8.7389159202576,10,'Goldigi Ussicht','Schöne Weg dur de Rebberg',1),
	(111,47.495273582331,8.73071372509,10,'Kantonschule Büelrain','So jungi Wirtschaftsgenies sölls da geh',1),
	(112,47.496832083254,8.7295925617218,10,'Technikum Mensa','Eingentlich für Studis, aber immer voll Gymischüeler',1),
	(113,47.496567503799,8.7304562330246,10,'Laborgebäude','Zudem hets en grosse Höörsaal im Fall ja',1),
	(114,47.496201439615,8.7237507104874,10,'Rosengarten','Rösli mit Ussicht',1),
	(115,47.495900612682,8.7254565954208,10,'Schuelhus Heiligberg','De Berg isch es vilich, obs d\'Schüeler echt au sind?',1),
	(116,47.496683483998,8.7140035629272,10,'Brüehlguetpark','De Park mit em chrumme Haag',1),
	(117,47.494371080416,8.7077808380127,10,'Gaswerk','Richtigs Gas hets da nüme, aber Gas gebed da amigs Bands a ihrne Uftritt.',1),
	(118,47.489901836333,8.7092614173889,10,'Bahnhof Töss','Nid gross aber defür Gleis',1),
	(119,47.49079716549,8.7126678228378,10,'Grüene Hund','Hünd bechunnt mer da nid serviert, aber fein isch es also.',1),
	(120,47.490499932402,8.7163746356964,10,'Storchebrugg','Yay Hängebrugg ... aber so chillig zum hänge isch sie gar nid',1),
	(121,47.472007129771,8.7091487646103,10,'Reitplatz Winterthur','De Fuessballplatz im Wald',1),
	(122,47.473337306783,8.7086069583893,10,'Beachvolleyball am Riitplatz','Grite wierd da scho lang nüme, emal sicher kei Ross.',1),
	(123,47.482854403588,8.7057906389236,10,'Badi Töss','Gump und Plantsch!',1),
	(124,47.488687499119,8.7050771713257,10,'Chletterhalle','Schweisstribendi Sache mit Seil',1),
	(125,47.492779324749,8.7138158082962,10,'Schuelhus Tössfeld','Het es riesigs Umspannwerk under em Sportplatz',1),
	(126,47.491115903449,8.709272146225,10,'Schuelhus Gutenberg','Da git de Balu Unterricht',1),
	(127,47.491500366058,8.70620906353,10,'Zentrum Töss','Nid schön, aber trotzdem unter Denkmalschutz',1),
	(128,47.495233713096,8.7214547395706,10,'Entlipark','Heisst eigentlich Frohbergpark',1),
	(129,47.495193843831,8.7203818559647,10,'Wylandbrugg','Kein Ahnig warum die so heisst',1),
	(130,47.496701605881,8.7191104888916,10,'ZHAW Bibliothek','Büecher, Büecher und no meh Büecher',1),
	(131,47.501532676783,8.7496340274811,10,'Birchermüesliquartier','Das heisst würkli so und Strasse sind drum au so benennt.',1),
	(132,47.500873096907,8.7513452768326,10,'Schuelhus Talacker','Da isch de Punkt i di 1.-3. Klass',1),
	(133,47.498760211075,8.750878572464,10,'Bahnhof Grüze','Chline versteckte Bahnhof i de Grüze',1),
	(134,47.497596819114,8.7508168816566,10,'Cuba 21','Jugendtreff mit Disco',1),
	(135,47.497531581418,8.7515223026276,10,'KVA Winterthur','Da verbrenne mer eusi Abfäll',1),
	(136,47.493939758761,8.7538558244705,10,'Busdepot Winterthur','Da gönd Büss go schlafe',1),
	(137,47.49290674712,8.742424249649,10,'Alts Busdept','Da sind Büss früehner go schlafe',1),
	(138,47.495422185577,8.7462437152863,10,'Arena Dütweg','Rugby und Football wierd da au gspillt',1),
	(139,47.496993367336,8.7479388713837,10,'Minarett','Ja Winterthur het tatsächlich es Minarett, au wenns fasch keine kennt',1),
	(140,47.498856253185,8.7494704127312,10,'Kafiröschterei','Da tuet Küng Kafi röschte',1),
	(141,47.500474445710836,8.760781288146973,10,'Karls Kühne Gassenschau','Wohl sgeilschte Theater vo de Welt',1),
	(142,47.501137654666,8.755567073822,10,'Zugfabrik','Da tuet Stadler Züg baue',1),
	(143,47.504555041217,8.7625300884247,10,'Halle 710','Früehner Industrie, hüt Quartierzentrum',1),
	(144,47.505265307846,8.7644881010056,10,'Eulachpark','De gröschti Stadtpark in Winti',1),
	(145,47.505453744318,8.7625676393509,10,'Spielplatz Eulachpark','Platz zum spiele im Eulachpark',1),
	(146,47.505615001916,8.7677684426308,10,'Wassersagi','Alti mit Wasser betriebeni grossi Sagi',1),
	(147,47.501521804655,8.7689928710461,10,'Bahnhof Hegi','De Jüngschti Bahnhof vo Winti',1),
	(148,47.501250000708,8.7198615074158,10,'Sankt Peter und Paul','Ding Dong und so',1),
	(149,47.507653327719,8.718466758728,10,'Delphin','Spring und Plantsch',1),
	(150,47.507137918978,8.7216746807098,10,'Juchpark','Noch so ein kleiner Park',1),
	(151,47.508214985807,8.7136816978455,10,'Schulhaus Wiesenstrasse','Strasse, Wiese, Schulhaus, Wau!',1),
	(152,47.50962453996,8.722972869873,10,'Lindspitz','So seged mier dem Platz emal',1),
	(153,47.516671413786,8.7203121185303,10,'Schabesa','Hemmer eus früehner vil zur Pfadi troffe',1),
	(154,47.513914795106,8.7187403440475,10,'Bettenplatz','Nomal so en Pfaditreffpunkt',1),
	(155,47.513340908321,8.715760409832,10,'Badi Wolfensberg','Plantsch am Hügel',1),
	(156,47.513525372615,8.7115198373795,10,'Güetli 1','Früehner sind da Rössli gumped',1),
	(157,47.516773186726,8.7006032466888,10,'Chöpfi 1','Geili Felsformation',1),
	(158,47.516891732078,8.7163960933685,10,'Schuelhus Schachen','Obs da au Schach spieled?',1),
	(159,47.513932685449,8.7289381027222,10,'Walchweiher Grillplatz','Grillplatz bim ... genau!',1),
	(160,47.513302247224,8.7279081344604,10,'Underi Walcheweiher','Da hets Chrebsli',1),
	(161,47.514316741805,8.7292921543121,10,'Mittleri Walcheweiher','Chan mer easy au bade',1),
	(162,47.515021441675,8.7300699949265,10,'Oberi Walcheweiher','De chlinschti, defür mit Enteinsle',1),
	(163,47.511101088865,8.7324947118759,10,'Römerholz','Berüehmts Bildermuseum',1),
	(164,47.504634765501,8.7418395280838,10,'Halbzyt Stäge','Wenn e Pause bruchsch',1),
	(165,47.509986887096,8.750513792038,10,'Lindebergschuelhus','Da isch de Punkt id Sek',1),
	(166,47.512606582462,8.751425743103,10,'Waldschuelzimmer','Schuelzimmer im Wald',1),
	(167,47.49177403556,8.7486737966537,10,'Schuelhus Guetschick','Schickt sich total guet',1),
	(168,47.494347520921,8.7269988656044,10,'Spielplatz Heiligberg','Platz zum spile im Büelpark',1),
	(169,47.49411373767,8.7279295921326,10,'Büelpark','Het sogar e grossi Spielwiese',1),
	(170,47.490184573505,8.7407585978508,10,'Schuelhus Mattebach','Bach mit Schuelhus',1),
	(171,47.483402086565,8.7651532888412,10,'Schuelhus Büelwiesen','Sek Büelwiesen',1),
	(172,47.487317258043,8.7667787075043,10,'Bahnhof Seen','De letscht vor em Tösstal',1),
	(173,47.508051924401,8.7604540586472,10,'Bahnhof Oberi','Sozsäge de HB vo Oberi',1),
	(174,47.516702538367,8.7609314918518,10,'Bahnhof Wallrüti','Eine vo de ganz chline',1),
	(175,47.514983398993,8.7607330083847,10,'Badi Oberi','Plitsch und Platsch',1),
	(176,47.519115397677,8.7596467137337,10,'Schuelhus Wallrüti','Halt so Schuel und so',1),
	(177,47.518541176206,8.7534373998642,10,'Schuelhus Zinzikon','S\'Neuschte in Winti',1),
	(178,47.513316740142,8.758624792099,10,'Schuelhus Guggebüehl','No so eis ...',1),
	(179,47.517410829144,8.7722182273865,10,'Segelflugplatz Hegmatten 1','Flüg und so',1),
	(180,47.51235295239,8.7793743610382,10,'Modellflugplatz','Für chlini Flüger',1),
	(181,47.519483113488,8.7131989002228,10,'Pfadiheim Schützeweiher','Euses neuschte Heim in Winti',1),
	(182,47.519079493746,8.7165033817291,10,'Schützeweiher','Chan mer leider nid so guet bade',1),
	(183,47.5200119546,8.7175709009171,10,'Minigolf Schützeweiher','Eine vo drü Minigolf Alage in Winti',1),
	(184,47.519617453953,8.716481924057,10,'Camping Winterthur','Da chan mer au im Winter zu Gast si',1),
	(185,47.484134390824,8.7224364280701,10,'Waldkunst','Kunst am Weg zum Bruederhus',1),
	(186,47.482307236407,8.7607678771019,10,'Bibliothek Seen','Viel zum läse',1),
	(187,47.481393635367,8.761864900589,10,'Ref. Kirche Seen','Reformierti Chile Seen',1),
	(188,47.476905158238,8.7543466687202,10,'Tierholzstatue','En Eule und en Has',1),
	(189,47.477311239796,8.7725615501404,10,'Endstation Oberseen','Die lethschti Station vom 3er',1),
	(190,47.476716619305,8.7776148319244,10,'Armbrustschützestand Oberseen','Swusch und Treff',1),
	(191,47.483590601509,8.7713813781738,10,'Haltestell Stocken','Scho fasch am Endi vo de Linie 3',1),
	(192,47.485635220125,8.7648743391037,10,'Post Seen','Und ab die Post ...',1),
	(193,47.487349883246,8.7588849663734,10,'St. Urban / Abteilig Hartmannen','Da ganz ide Nächi isch s\'Dihei vo de Abteilig Hartmannen',1),
	(194,47.491240293404,8.7643338739872,10,'Högerli','Es chlises Högerli',1),
	(195,47.50228647221,8.7261164188385,10,'ZHAW Wirtschaft','Da wos lerned Kravatte binde',1),
	(196,47.503228701272,8.7268352508545,10,'Sprachenturm','ZHAW Linguistik',1),
	(197,47.503757791716,8.7276184558868,10,'Roter Turm','Höchstes Gebäude von Winterthur',1),
	(198,47.503757791716,8.7276184558868,10,'Roter Turm','Höchstes Gebäude von Winterthur',1),
	(199,47.500829607832,8.7304401397705,10,'Altstadt Schulhaus','Alti Stadt, jungi Schüeler',1),
	(200,47.502076280342,8.7295818328857,10,'Alter Pfadiballsaal','Da het früehner de Pfadiball stattgfunde',1),
	(201,47.501742870827,8.7310516834259,10,'Alti Füürwehr','Füüürio!',1),
	(202,47.499109948479,8.7327817082405,10,'S\'Chliinschte Hüsli','S\'chlinschte Huus vo Winti',1),
	(203,47.498897931782,8.7338465452194,10,'Schuelhus Geiselweid','Ob da d\'Lehrer sich da mängishc als Geisel fühled?',1),
	(204,47.496154322257,8.7331438064575,10,'Zirkusplatz','So mit Clowns und so',1),
	(205,47.494327585956,8.7335515022278,10,'Haltestelle Zeughaus','Viel Zeug im Haus',1),
	(206,47.493370698722,8.72673869133,10,'Stadtgärtnerei','Grüen Stadt Winti',1),
	(207,47.492815206908,8.7207144498825,10,'Scout Inn','E Legendä under denä wos no kenned',1),
	(208,47.484830432933,8.7068581581116,10,'Haltestelle Schwümbi Töss','Töss schwümmt ja au ... irgendwie',1),
	(209,47.477449016755,8.7032318115234,10,'Haltestelle Steigmühle','Scho fasch am Endi vo Winterthur',1),
	(210,47.474910962183,8.7010860443115,10,'Haltestelle Steig','So ziemlich de hinderscht Egge',1),
	(211,47.479631645637,8.6974596977234,10,'Haltestelle Ziegeleiweg','Eiziegel oder so',1),
	(212,47.482735028258,8.6988973617554,10,'Haltestelle Neubruch','S\'Gägeteil vo Altbruch halt',1),
	(213,47.485120447757,8.6912155151367,10,'Haltestelle Dättnau','Offiziell ja no Winti, aber ...',1),
	(214,47.496633953711,8.6763077974319,10,'Neuburg','Nid ganz Burg aber ja',1),
	(215,47.500626658343,8.6936724185944,10,'Technische Fachschule STF','Technikerschuel im Schlosstal',1),
	(216,47.502325677582,8.691092133522,10,'Chinesebrüggli','Bogebrüggli für Fuessgänger',1),
	(217,47.503378873552,8.69648873806,10,'Waldschenki 1','Guete Ort zum Miete für Feschtli',1),
	(218,47.510490545459,8.6943483352661,10,'Haltestelle Lindenplatz','Beim alten Dorfkern Wülflingen',1),
	(219,47.515077599869,8.694144487381,10,'Strassenverkehrsamt','Amt mit Verchehr',1),
	(220,47.501895079781,8.748185634613,10,'Haltestelle Stadtrain','Rain in die Stadt',1),
	(221,47.504997147085,8.7484860420227,10,'Haltestelle Hammerweg','Hammer de Wäg',1),
	(222,47.507736670912,8.7509322166443,10,'Haltstelle Oberes Büel','Het früehner mal anders gheisse',1),
	(223,47.50331567541,8.7519407272339,10,'Haltestelle Talacker','En Acker im Tal',1),
	(224,47.504272381416,8.7531101703644,10,'Chindergarte Underwegli','Da isch s\'Pünktli hi, wos no ganz chli gsi isch',1),
	(225,47.502431431628,8.764214515686,10,'Haltestelle Else Züblin','Heeeelgaaa!',1),
	(226,47.501373218671,8.7618112564087,10,'Haltestelle Industriepark','Park mit Industrie',1),
	(227,47.497662056728,8.7601161003113,10,'Brocki Grüze zum Erschte','Brocki 1',1),
	(228,47.495153974535,8.7652015686035,10,'Brocki Grüze zum Zweite','Brocki Grüze 2',1),
	(229,47.494117362225,8.7646651268005,10,'Pfadi Dance Night','Die isch meischtens da',1),
	(230,47.497002428224,8.76060962677,10,'Trocheiis','Bim PanGas chan mer Trocheiis chaufe',1),
	(231,47.497952000702,8.7633454799652,10,'Ohrbüehl','Chlöpf und Peng',1),
	(232,47.496379035429,8.7556636333466,10,'Brocki Grüze zum Dritte','Komisches Brocki #3 Grüze',1),
	(233,47.491674355773,8.7593328952789,10,'Haltestelle Etzberg','Etz am Berg oder was?',1),
	(234,47.489209486317,8.7629914283752,10,'Schuelhuss Tägelmoos','Tägleds im Moos oder was?',1),
	(235,47.488064007612,8.7529063224792,10,'Haltestelle Endliker','Halt en Haltestell',1),
	(236,47.490905908883,8.7472200393677,10,'Haltestelle Waldegg','Kei Ahnig wo de Wald isch',1),
	(237,47.498053480714,8.7164282798767,10,'Anton-Graff Berufschule','Bruefsschuel',1),
	(238,47.494769777953,8.7059998512268,10,'Schuelhus Rebwiesen','Wiese? Rebe? Giraffe?',1),
	(239,47.488238005986,8.7100446224213,10,'Schuelhus Eichliacker','Eiche? Bueche? Tanne?',1),
	(240,47.486004983079,8.7090146541595,10,'Schuelhus Rosenau','Rose? Chriesi? Zebra?',1),
	(241,47.503989720092,8.7199795246124,10,'Roschthuufe','So het mer dem Schuelhus früehner mal gseit',1),
	(242,47.505533467238,8.7167823314667,10,'Haltestelle Hinterwiesli','Hinder de Wiese',1),
	(243,47.510113708002,8.7368063628674,10,'Bienehüsli Mocketobel','Summ Summ im Mockige',1),
	(244,47.507329012731,8.7449991703033,10,'Vitaparcour','De Start vom Schnuf',1),
	(245,47.511932648429,8.7385886907578,10,'Tümpel','Wald im Tümpel',1),
	(246,47.49151486772,8.7142825126648,10,'HaltestelleTössfeld','Feld neb de Töss',1),
	(247,47.493907137652,8.7108278274536,10,'Haltestelle Gaswerk','Gasigi Station',1),
	(248,47.516831154538,8.7117505073547,10,'Häxefelse','Felsigi Häx',1),
	(249,47.509280307863,8.7159937620163,10,'Chile Veltheim','Chile halt',1),
	(250,47.501576165275,8.7031888961792,10,'Brüehlbergturm 2','',1),
	(251,47.502141512391,8.7030601501465,10,'Brüehlbergturm 3','',1),
	(252,47.502054536308,8.7018585205078,10,'Brüehlbergturm 4','',1),
	(253,47.501394962988,8.7022018432617,10,'Brüehlbergturm 5','',1),
	(254,47.50475072788,8.7432718276978,10,'Bäumli 2','',1),
	(255,47.50497540426,8.7430787086487,10,'Bäumli 3','',1),
	(256,47.505158406085,8.7416034936905,10,'Goldebergbrunne','',1),
	(257,47.501996552173,8.7451708316803,10,'Haltestelle Bäumliweg','',1),
	(258,47.500641154761,8.7376660108566,10,'Haltestell Palmstrass','',1),
	(259,47.497546078691,8.7417054176331,10,'Mühli WG','',1),
	(260,47.500565048521,8.7190622091293,10,'S24 WG','',1),
	(261,47.504460821452,8.725118637085,10,'Banane','',1),
	(262,47.49316409578,8.7404018640518,10,'Zwinglichile','',1),
	(263,47.494465318289,8.7370812892914,10,'Schuuelhus Schönegrund','',1),
	(264,47.490006956741,8.7568330764771,10,'Tümpel','',1),
	(265,47.484772429776,8.7592363357544,10,'Haltestell Hinterdorf','',1),
	(266,47.478174152687,8.7711775302887,10,'Sek Schuelhus Oberseen','',1),
	(267,47.516316687962,8.7719392776489,10,'Segelflugplatz Hegmatten 2','',1),
	(268,47.514997891447,8.7715101242065,10,'Segelflugplatz Hegmatten 3','',1),
	(269,47.513476161973,8.7709736824036,10,'Segelflugplatz Hegmatten 4','',1),
	(270,47.505560645478,8.6839145421982,10,'Wespimühli','',1),
	(271,47.506019049676,8.6856150627136,10,'Haltestell Klinik','',1),
	(272,47.509780349535,8.6799073219299,10,'Haltestell Niederfeld','',1),
	(273,47.507682316671,8.6908480525017,10,'Schulhaus Ausserdorf','',1),
	(274,47.50737793188,8.6892467737198,10,'Haltestelle Ausserdorf','',1),
	(275,47.509972393258,8.6836087703705,10,'Adee Eulach','',1),
	(276,47.513008764777,8.6987310647964,10,'Strickhof Buureschuel','',1),
	(277,47.516955777919,8.700262606144,10,'Chöpfi 2','',1),
	(278,47.516607367598,8.7001526355743,10,'Chöpfi 3','',1),
	(279,47.504605774866,8.7548160552979,10,'Haltestell Hohlandweg','',1),
	(280,47.510505039154,8.759713768959,10,'Römertor','',1),
	(281,47.517697041119,8.7575572729111,10,'Haltestell Zinzikon','',1),
	(282,47.520939460155,8.7581849098206,10,'Endstation Bus 1','',1),
	(283,47.513477973582,8.7640079855919,10,'Technorama 1','',1),
	(284,47.513309493683,8.7648528814316,10,'Technorama 2','',1),
	(285,47.513671815378,8.7635225057602,10,'Technorama 3','',1),
	(286,47.513204419924,8.7631791830063,10,'Haltestell Technorama','',1),
	(287,47.506982953746,8.7591934204102,10,'Unterirdisches Endi vom Riedbach','',1),
	(288,47.506374174288,8.7695252895355,10,'Staudamm','',1),
	(289,47.508099031082,8.7713170051575,10,'Schloss Hegi 1','',1),
	(290,47.501184767551,8.7654483318329,10,'Solarenergie','',1),
	(291,47.498560877834,8.765105009079,10,'Fahrschuelpark','',1),
	(292,47.502358951969,8.7116861343384,10,'Pünte','',1),
	(293,47.507251104363,8.7115466594696,10,'Haltestell Blumenau','',1),
	(294,47.507650378757,8.7113830447197,10,'Jung WG','',1),
	(295,47.509367082563,8.7027731537819,10,'Ne/Wa Underschlupf','',1),
	(296,47.510838393018,8.7027490139008,10,'Schuelhus Talhof-Erlen','',1),
	(297,47.510710940613,8.7013133615255,10,'Schlufi WG','',1),
	(298,47.511096540811,8.6945629119873,10,'Chlie Wülflinge','',1),
	(299,47.510881322445,8.691081404686,10,'Brocki Wülflingen','',1),
	(300,47.512095757379,8.6886835098267,10,'Haltestell Autobahn','',1),
	(301,47.513620166514,8.6888390779495,10,'Schuelhus Langwiesen','',1),
	(302,47.515113830931,8.6829543113708,10,'Endstation Bus 2','',1),
	(303,47.513925439076,8.6850249767303,10,'Haltestell Langwiesen','',1),
	(304,47.50033672914,8.723863363266,10,'Hauptbahnhof Winterthur','',1),
	(305,47.500133777745,8.724582195282,10,'Hauptpost Winterthur','',1),
	(306,47.489175605873,8.7030708789825,10,'Endstation Bus 1','',1),
	(307,47.490021451146,8.7024915218353,10,'Sali Töss','',1),
	(308,47.49532433425,8.7001311779022,10,'Friedhof Nägelsee','',1),
	(309,47.49759756674,8.6986076831818,10,'Haltestell Grafenstein','',1),
	(310,47.496731340937,8.7015473842621,10,'Haltestell Nägelsee','',1),
	(311,47.493582737737,8.7640187144279,10,'Spielplatz','',1),
	(312,47.495581661763,8.761864900589,10,'Underfüehrig','',1),
	(313,47.496292049799,8.7588286399841,10,'Recycling','',1),
	(314,47.494298589629,8.7574660778046,10,'Haltestell Grüze-Märt','',1),
	(315,47.496389908622,8.7516939640045,10,'Haltestell Rudolf-Diesel','',1),
	(316,47.492508035437,8.7615430355072,10,'Tennis & Squash','',1),
	(317,47.490782666354,8.7659847736359,10,'Underfüehrig','',1),
	(318,47.480719300598,8.7720787525177,10,'Haltestell Grüntal','',1),
	(319,47.480284241316,8.7637317180634,10,'Kirchacker','',1),
	(320,47.508113525436,8.7635600566864,10,'Schuelhus Hegifeld','',1),
	(321,47.485091446346,8.7628197669983,10,'Shopping Seen','Shoppy Shoppy',1),
	(322,47.488335879819,8.7097120285034,10,'Schulhaus Eichliacker','',1),
	(323,47.485365146519,8.760789334774,10,'Brunnen aus 1986','Uuuralt',1),
	(324,47.484980878323,8.7073972821236,10,'Haltestelle Schwimmbad Töss','',1),
	(325,47.510751431345,8.7260842323303,10,'Kino am Pool','',1),
	(326,47.483298765588,8.7614142894745,10,'Schulhaus Seen','',1),
	(327,47.486707344268,8.7084674835205,10,'Station Rosenau','',1),
	(328,47.510780418585,8.7234556674957,10,'Entlitümpel','',1),
	(329,47.511505094395,8.7216103076935,10,'Haltestell Loorstrasse','',1),
	(330,47.486265990656,8.7560176849365,10,'Waser','',1),
	(331,47.513925439076,8.7209129333496,10,'Chile Roseberg','',1),
	(332,47.490656704941,8.7217953801155,10,'Jonas Furrer','',1),
	(333,47.514360219705,8.723509311676,10,'Friedhof Roseberg','',1),
	(334,47.510381842624,8.7304401397705,10,'Lindebergspital','',1),
	(335,47.493783902166,8.7102001905441,10,'Gaswerk','',1),
	(336,47.500479881884,8.7985253334045,40,'Top of Elsau','Diese Station wird sicher nicht so schnell abgeköpft',1),
	(337,47.493232963518,8.7086445093155,10,'Schöntal','',1),
	(338,47.484232272303,8.7572005391121,10,'Champagner','',1),
	(339,47.491174141622,8.7060749530792,10,'Zentrum Töss','',1),
	(340,47.48556271728,8.7459003925323,10,'Tümpel','',1),
	(341,47.481103599968,8.7357938289642,10,'Eschebergturm 2','',1),
	(342,47.481516899926,8.7341201305389,10,'Eschebergturm 3','',1),
	(343,47.480501771407,8.7343776226044,10,'Eschebergturm 4','',1),
	(344,47.510055732769,8.7544512748718,10,'Im Geissacker','',1),
	(345,47.508200491481,8.7083601951599,10,'Feldtal','',1),
	(346,47.509733244363,8.7033444643021,10,'Oberfeld','',1),
	(347,47.50823672729,8.7717890739441,10,'Schloss Hegi 2','',1),
	(348,47.508519365744,8.7711775302887,10,'Schloss Hegi 3','',1),
	(349,47.510474240048,8.6930340528488,10,'Bibliothek Wülflingen','',1),
	(350,47.504605774866,8.772132396698,10,'Haltestell Stäfelistrasse','',1),
	(351,47.509693386108,8.6892521381378,10,'Unterdorf','',1),
	(352,47.505649427631,8.7762308120728,10,'Hegi im Gern','',1),
	(353,47.487155774787,8.7185794115067,10,'Pünten Breite','Hier kann man breite Rüebli und breite kopfsaläte anbauen',1),
	(354,47.503620083758,8.7777328491211,10,'Haltestell Hofackerstrasse','',1),
	(356,47.505460991861,8.7793850898743,10,'Chli Hegi','',1),
	(357,47.489336357422,8.7165838479996,10,'Uhrwerk','',1),
	(358,47.490412937033,8.7126839160919,10,'WG am Damm','',1),
	(359,47.48966622086,8.7313842773438,10,'Turmstrasse','',1),
	(360,47.494558025133,8.7168842554092,10,'Webling','',1),
	(361,47.517793490327,8.6919772624969,10,'Sporrer','Hier gibts gutes Essen. Dafür habt ihr aber keine Zeit ;)',1),
	(362,47.499376103921,8.7080866098404,10,'Buurehof','',1),
	(363,47.547432723912,8.7198883295059,10,'Senn-Hus','',1),
	(364,47.508533078996,8.6912812292576,10,'Pögida','',1),
	(365,47.503779535045,8.7213206291199,10,'Tellstrasse','',1),
	(366,47.507039269896,8.7233282625675,10,'Die Löwen','',1),
	(367,47.548899780335,8.706761598587,10,'Espenlaub','',1),
	(368,47.49843765327,8.7213313579559,10,'Kesselhaus','',1),
	(369,47.499601620182,8.7152749300003,10,'Zupf und weg','',1),
	(370,47.505116732458,8.709824681282,10,'Caliente','Hier gehts heiss zu und her',1),
	(371,47.492228935458,8.7532335519791,10,'Pünten Deutweg','Manche Pünten funktionieren auch als Spunten',1),
	(372,47.511867428548,8.7190461158752,10,'Mega steil','',1),
	(373,47.508193244316,8.6962902545929,10,'Schulhaus Hohfurri','',1),
	(374,47.511824177323,8.7134617567062,10,'Gallispitz 1','',1),
	(375,47.508171502815,8.7022930383682,10,'Brüggli','',1),
	(376,47.496524011158,8.7121260166168,10,'Brüehlguet','',1),
	(377,47.49646352563,8.7083628773689,10,'Chrumme Tschuttiplatz','',1),
	(378,47.385326253629,8.6576020717621,10,'Cargo','',1),
	(379,47.385627713484,8.6581653356552,10,'SWO','',1),
	(380,47.385090169407,8.6585837602615,10,'Chimlimärt','',1),
	(381,47.506323442348,8.7322211265564,10,'Schwöschtere Huus','',1),
	(382,47.508200491481,8.7299680709839,10,'Altes Brauereiareal','',1),
	(383,46.950005657617,7.4405390024185,10,'Bern 1','',1),
	(384,46.94995904863,7.4414777755737,10,'Bern 2','',1),
	(385,46.950575319728,7.4420034885406,10,'Bern 3','',1),
	(386,46.950214637092,7.4426807463169,10,'PBS','',1),
	(387,47.486374743431,8.7646973133087,10,'Haltestelle Post Seen','',1),
	(388,47.485192951212,8.7682271003723,10,'Underfüehrig','',1),
	(389,47.486381993608,8.7697720527649,10,'Michaelschule','',1),
	(390,47.487984258164,8.7470805644989,10,'Brüggli','',1),
	(391,47.48602673376,8.7504279613495,10,'Brüggli','',1),
	(392,47.487224819858,8.7502536177635,10,'Chindergarte Endliker','',1),
	(393,47.487922633508,8.7495213747025,10,'Spielplatz Endliker','',1),
	(394,47.4895574749,8.7405413389206,10,'Klimabaum','',1),
	(395,47.486940254227,8.7468338012695,10,'Waldeggsee','',1),
	(396,47.505526219704,8.7532067298889,10,'Blockquartier Unterwegli','',1),
	(397,47.507487546844,8.7557601928711,10,'Dorfschuelhus','',1),
	(398,47.507330824552,8.7586972117424,10,'Alit Post & ZKB','',1),
	(399,47.506667693837,8.7555134296417,10,'Alti Römermuure','',1),
	(400,47.506723860971,8.7559533119202,10,'Reformierti Chile Oberi','',1),
	(401,47.506656822772,8.7599658966064,10,'Jugendtreff Oberi','',1),
	(402,47.505109484868,8.7608778476715,10,'Ballsport im Eulachpark','',1),
	(403,47.505842392406,8.7641662359238,10,'Chilliere ade Eulach','',1),
	(404,47.505677511751,8.7656897306442,10,'Chilliere ade Eulach nomal so eis','',1),
	(405,47.504956379281,8.7671247124672,10,'Gugus Eulach','',1),
	(406,47.504848570938,8.7671247124672,10,'Überlaufstolle','',1),
	(407,47.505779882768,8.7656803429127,10,'Kanalende','',1),
	(408,47.499459683553,8.7377464771271,10,'Eisenblume','',1),
	(409,47.497749040088,8.7369096279144,10,'Altersheim Adlergarte','',1),
	(410,47.498133214872,8.7393450737,10,'Haltestelle Pflanzschulstrasse','',1),
	(411,47.497553327326,8.7396937608719,10,'Kamin im Sidiareal','',1),
	(412,47.495144913327,8.7400572001934,10,'Ise Dings Bums','',1),
	(413,47.496893697456,8.743861913681,10,'Eigeheimquartier','',1),
	(414,47.496556630642,8.7456321716309,10,'Blockfeld Boulderhalle','',1),
	(415,47.49729237584,8.7509000301361,10,'Grafitis','',1),
	(416,47.498376040879,8.7566077709198,10,'Stadtguet','',1),
	(417,47.497263381151,8.7601751089096,10,'Doppelleu','',1),
	(418,47.495320700479,8.7580078840256,10,'Grössere Coop gits glaub nid','',1),
	(419,47.494791525005,8.7560766935349,10,'Stewi','',1),
	(420,47.494081116669,8.7565594911575,10,'Werchzügparadies','',1),
	(421,47.493943383328,8.7593650817871,10,'Tischlein deck dich','',1),
	(422,47.49210207134,8.75807762146,10,'Frisbee','',1),
	(423,47.490761823839,8.7571046501398,10,'Pausebänkli','',1),
	(424,47.490873285889,8.7542259693146,10,'Jedem sini Pünt','',1),
	(425,47.494501563579,8.7466675043106,10,'Chugelstosse','',1),
	(426,47.492651209526,8.7500283122063,10,'Plitsch &Platsch','',1),
	(427,47.49323115121,8.7454926967621,10,'Alit Umziehkabine Dütweg','',1),
	(428,47.490434685889,8.746549487114,10,'Scho fasch es Hochhus','',1),
	(429,47.484215958735,8.7402006983757,10,'Forsthof','',1),
	(430,47.474622703947,8.7429231405258,10,'Sternwarte Eschenberg 2','',1),
	(431,47.4745692219,8.7428386509418,10,'Sternwarte Eschenberg 3','',1),
	(432,47.477190052489,8.7268942594528,10,'Ente','',1),
	(433,47.478321946077,8.7271329760551,10,'Parkplatz','',1),
	(434,47.478206578651,8.7256953120232,10,'Bushaltestelle Bruderhaus','',1),
	(435,47.481857688674,8.7232303619385,10,'Bushaltestell Brudertobel','',1),
	(436,47.484634672022,8.7109673023224,10,'Underfüehrig','',1),
	(437,47.513722540215,8.7120079994202,10,'Güetli 2','',1),
	(438,47.513396451118,8.7126839160919,10,'Güetli 3','',1),
	(439,47.512939922978,8.7129414081573,10,'Güetli 4','',1),
	(440,47.513041374019,8.7116324901581,10,'Güetli 5','',1),
	(441,47.511906163903,8.7133651971817,10,'Gallispitz 2','',1),
	(442,47.511926660528,8.7135475873947,10,'Gallispitz 3','',1),
	(443,47.513571488587,8.7056216597557,10,'Alt Erb Villa','',1),
	(444,47.516055829742,8.6973631381989,10,'Strickhof Guetsbetrieb','',1),
	(445,47.512751513381,8.6892199516296,10,'Autobahnbrugg','',1),
	(446,47.511910908478,8.6943590641022,10,'Jugentreff Wülflinge','',1),
	(447,47.512792635621,8.6903196573257,10,'Freizitalag Holzlegi','',1),
	(448,47.512664533697,8.6914676427841,10,'Friedhof Wülflinge','',1),
	(449,47.511009428722,8.6878037452698,10,'Autobahnbrugg','',1),
	(450,47.511280445964,8.6818814277649,10,'Station Hardau','',1),
	(451,47.504672917528,8.6844778060913,10,'Plätscher Plätscher','',1),
	(452,47.504624231302,8.6874014139175,10,'Underfüehrig','',1),
	(453,47.50355056043,8.6895042657852,10,'Station Letten','',1),
	(454,47.501210958102,8.6932191252708,10,'Station Fachschule','',1),
	(455,47.503453185852,8.6962580680847,10,'Waldschenki 2','',1),
	(456,47.503599247651,8.69648873806,10,'Waldschenki 3','',1),
	(457,47.498228006121,8.7062036991119,10,'Steil steil steil','',1),
	(458,47.499053203952,8.706933259964,10,'Gueti Ussicht','',1),
	(459,47.495998369481,8.709819316864,10,'Schoch & Nox','',1),
	(460,47.496423801712,8.6984574794769,10,'Tesla','',1),
	(461,47.493537970898,8.703864812851,10,'Brugg','',1),
	(462,47.491026195102,8.7037360668182,10,'Underfüehrig','',1),
	(463,47.490718622463,8.7029474973679,10,'Brugg','',1),
	(464,47.492216740545,8.7023520469666,10,'Underfüehrig','',1),
	(465,47.491406125588,8.7351286411285,10,'Station Waldheim','',1),
	(466,47.492595027335,8.7370330095291,10,'Statue us Holz','',1),
	(467,47.503496871068,8.7141913175583,10,'Chinderchrippe','',1),
	(468,47.50545736809,8.7144005298615,10,'Tele/Radio Top','',1),
	(469,47.501920447898,8.7192982435226,10,'Schuelhus Neuwise','',1),
	(470,47.504906551923,8.7187242507935,10,'WG an Deck','',1),
	(471,47.507613467885,8.7086123228073,10,'Bocciahalle','',1),
	(472,47.508522989304,8.7112838029861,10,'Bluemequartier','',1),
	(473,47.506051663261,8.7167930603027,10,'Schuelhus Gallispitz','',1),
	(474,47.488444628308,8.7051469087601,10,'Rieter','',1),
	(475,47.494704536745,8.7067803740501,10,'Rebwiesen','',1),
	(476,47.50702054927,8.7020053714514,10,'Tannenweg','',1),
	(477,47.510617365149,8.6947157979012,10,'Lindenplatz','',1),
	(478,47.509052026386,8.7057396769524,10,'Weststrasse','',1),
	(479,47.490277006481,8.7258669734001,10,'Breite','',1),
	(480,47.490103014862,8.7290185689926,10,'Nussbaumweg','',1),
	(481,47.4937784653,8.7416383624077,10,'Deutweg','',1),
	(482,47.497136529196,8.7465173006058,10,'Eishalle','',1),
	(483,47.500974571273,8.7404823303223,10,'Haltestelle Swica','',1),
	(484,47.500265152621,8.7348845601082,10,'Museum Lindengut','',1),
	(485,47.50774391814,8.7557481229305,10,'Betreibungsamt','',1),
	(486,47.508821932146,8.7527158856392,10,'Bäumlistrasse','',1),
	(487,47.510314809097,8.7590083479881,10,'Römertor','',1),
	(488,47.487460446283,8.7125363945961,10,'Kreuzung Bütziackerstrasse','',1),
	(489,47.484435285159,8.7118577957153,10,'Kreuzung Reitplatzstrasse','',1),
	(490,47.481161607176,8.6994230747223,10,'Bolrebenweg','',1),
	(491,47.495621530734,8.7042993307114,10,'Haltestelle Friedliweg','',1),
	(492,47.496455147736,8.7001848220825,10,'Brücke','',1),
	(493,47.509249508039,8.6976903676987,10,'Kreuzung Erlenstrasse','',1),
	(494,47.516240604448,8.7573426961899,10,'Zinzikon','',1),
	(495,47.513880149219,8.7576699256897,10,'Guggenbühl','',1),
	(496,47.510677151468,8.7584933638573,10,'Haltestelle Römertor','',1),
	(497,47.514351161812,8.7631845474243,10,'Haltestelle Pfaffenwiesen','',1),
	(498,47.520776438284,8.757364153862,10,'Kreuzung Farmerstrasse','',1),
	(499,47.518990409942,8.7579274177551,10,'Haltestelle Obstgartenweg','',1),
	(500,47.507903356901,8.7179973721504,10,'Bahnübergang','',1),
	(501,47.509310201793,8.7175521254539,10,'Dorfplatz','',1),
	(502,47.510475145905,8.7229607999325,10,'Altersheim','',1),
	(503,47.509747738267,8.7081670761108,10,'Kreuzung Kronenweg','',1),
	(504,47.489607316826,8.7498633563519,10,'Haltestelle Gutschick','',1),
	(505,47.49009032795,8.7487542629242,10,'Haltestelle Waldegg','',1),
	(506,47.484476068897,8.763038367033,10,'Zentrum Seen','',1),
	(507,47.482069774172,8.7590512633324,10,'Kindergarten Waldeggstrasse','',1),
	(508,47.482785782992,8.7704935669899,10,'Kindergarten Grüntal','',1),
	(509,47.487879133707,8.7618219852448,10,'Wurmbühlstrasse','',1),
	(510,47.491474995631,8.761233240366,10,'Kita','',1),
	(511,47.493309080385,8.7549555301666,10,'Haltestelle Grützefeldstrasse','',1),
	(512,47.492575091704,8.7438002228737,10,'Depot','',1),
	(513,47.488959368099,8.747102022171,10,'Endlikerstrasse','',1),
	(514,47.509898112279,8.6931949853897,10,'Rankstrasse','',1),
	(515,47.512936299723,8.7606820464134,10,'Im Mooshof','',1);

/*!40000 ALTER TABLE `station` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle team
# ------------------------------------------------------------

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `t_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'team ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'team name',
  `hash` varchar(100) NOT NULL DEFAULT '' COMMENT 'team hash',
  `img_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_ID`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;

INSERT INTO `team` (`t_ID`, `name`, `hash`, `img_ID`)
VALUES
	(1,'Wildhund','DanachFuehrungsblechmahnst',NULL),
	(2,'Albatros','SchwammFerienzeiterblassende',NULL),
	(3,'Ameise','maedchenhafteremFluchtgelderAufwickelvorrichtung',NULL),
	(4,'Ameisenbär','KorinthenAusschnittenlangsamfahren',NULL),
	(5,'Braunbär','regulierendeDisziplinarverfahrensKEMCOL',NULL),
	(6,'Dachs','gescherztebeirrendemherzustellen',NULL),
	(7,'Eisbär','Platteschmelzbaresqualifizierten',NULL),
	(8,'Elefant','Fliegenpilzsuppeauftretendenzurueckverguetendes',NULL),
	(9,'Ente','Suchbohrungsuedlichstemvorgesetzte',NULL),
	(10,'Flusspferd','Schreihalsolympiadrittenbelustigender',NULL),
	(11,'Fuchs','TuerschildernFaelltwiederaufbauender',NULL),
	(12,'Geier','inkorrekteresFleischbeschauersUmrechnen',NULL),
	(13,'Kakadu','wiedergewinnendtrecktestZwischenrufern',NULL),
	(14,'Giraffe','leichtverstaendlichenSchutzgeleiteHeben',NULL),
	(15,'Gorilla','GrundstuecksausnutzungCharakterfehlernuebertuencht',NULL),
	(16,'Hahn','bootetschiessGesamtstrategie',NULL),
	(17,'Hausrind','KonfuzionismusWeiterzahlungverglasend',NULL),
	(18,'Hummer','WohnungsinhaberinnenausgefechteterAngelhaken',NULL),
	(19,'Hund','raechstgelegenenBundstiftes',NULL),
	(20,'Hyäne','lustigstepflichtwidrigzurueckgegebenen',NULL),
	(21,'Riesenkrabbe','nachgewieseneunfeinesentgegengewirktes',NULL),
	(22,'Kamel','regelrechtengediegeneressichertest',NULL),
	(23,'Katze','penetrantestenandrehendemwahrhaftere',NULL),
	(24,'Koala','wahrnehmbarerehochmuetigeremGedenkwort',NULL),
	(25,'Kolibri','Armutszeugnissefolgerichtigenpraesentierende',NULL),
	(26,'Krake','ViertelstundeSkelettGespenster',NULL),
	(27,'Krokodil','saldierendesfruehzeitigErkennungsworten',NULL),
	(28,'Laubfrosch','Beurteilungskriterieneurasischekolumbianische',NULL),
	(29,'Löwe','PasteurisierungherunterreissenderRatensenkung',NULL),
	(30,'Luchs','DiversewinzigemSchaltstellen',NULL),
	(31,'Merinoschaf','RadarschirmPassierscheineaechztest',NULL),
	(32,'Möve','ausschlafendesgespurteteknoepfende',NULL),
	(33,'Nashorn','FussballaenderspielwirdFruehzuegen',NULL),
	(34,'Orang-Utan','KreislaeufenaufgebrachteRaupenantrieb',NULL),
	(35,'Orca','anfallendeWeiterblaetternWirtschaftssystem',NULL),
	(36,'Panda','fleckenloseszimmertestWaidmann',NULL),
	(37,'Pavian','Mitgliedsbeitragparasitischensachkundigem',NULL),
	(38,'Pelikan','erteilteswillenloserenWechselbriefe',NULL),
	(39,'Pferd','GrundgesetzeDarlehenssummeundemokratische',NULL),
	(40,'Pinguin','Vorsteherinnenkameradschaftlicherhingegen',NULL),
	(41,'Python','ebenbuertigRachegeluesteModetrends',NULL),
	(42,'Robbe','klapperstergreifendeStaendchens',NULL),
	(43,'Rosapelikan','zuckeGaleriegebaeudenachbestellend',NULL),
	(44,'Schaf','ProjektbeschreibungKeilflossenPreisspektrum',NULL),
	(45,'Schildkröte','SchlafrockesMagenverdauungwiedererkannten',NULL),
	(46,'Schimpanse','IdealfaelleBankenbeteiligungFederzug',NULL),
	(47,'Schlange','fristetestverfuenffachendSpinne',NULL),
	(48,'Schwan','HemmungAraberligaLeistungsziel',NULL),
	(49,'Schwein','betontabspielendeSchaums',NULL),
	(50,'Sibirischer Tiger','eingehaltenesHerrnausgeht',NULL),
	(51,'Spatz','weiserVorlaufesueberstimmst',NULL),
	(52,'Sperber','menschenunwuerdigstesabgewertetabgeschaltet',NULL),
	(53,'Storch','abgegrenztenberedeterlichtende',NULL),
	(54,'Syrischer Braunbär','dechiffriertepulverisierterNeige',NULL),
	(55,'Taube','DiskussionsrundeFrachterMeisterschuss',NULL),
	(56,'Virginia-Opossum','feuchtigkeitsgeschuetztDezimalteilende',NULL),
	(57,'Wal','Lueftenwiderstreiteleichtsinniger',NULL),
	(58,'Totenkopfäffchen','schwersterExporthandelverscheuchte',NULL),
	(59,'Weissstorch','ungesaeumtenArbeitsdienstverneinen',NULL),
	(60,'Wolf','HerbstmonateKundenbetreuungExportfirma',NULL);

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
	(2,'admin','Adressen5Ostafrikas');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
