# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27-0ubuntu1)
# Datenbank: piox_live
# Erstellt am: 2017-03-05 11:47:40 +0000
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
('show_team_points','1'),
('home_location_lat','47.499163'),
('home_location_long','8.721871'),
('home_location_title','Startpunkt'),
('info_text','<h3>Spielregeln</h3> <h5>Wie funktioniert das Spiel?</h5> Wer am Ende am meisten Punkte hat, gewinnt. Punkte könnt Ihr auf drei Arten machen: <ul> 	<li>Stationen erobern<br/> Überall in der Stadt gibt es Stationen die deine Gruppe einnehmen kann. Klickt auf die 		Station, macht ein Foto <b>von eurer ganzen Gruppe</b> und ladet das Foto hoch. Damit gehört die Station euch! Zumindest solange Sie euch kein anderes Team wegschnappt. Alle 5 Minuten 		bekommt Ihr Punkte für jede Station in eurem Besitz. 	</li> 	<li>Mister X<br/> In der Stadt sind einige Mister X unterwegs. Ihr seht 		sie anhand vom Pio-X Logo auf der Karte. Sobald Ihr einen gefangen habt, bekommt Ihr einen Passcode, welcher 		euch viele Bonuspunkte bringt. 	</li> 	<li>Rätsel lösen<br/> Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen 		seid, könnt ihr die Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien. 		Rätselserien geben komplett gelöst deutlich mehr Punkte als Einzelrätsel. 	</li> </ul>  <h5>Regeln</h5> <ul> 	<li>Man darf nur zu Fuss unterwegs sein. Velos sind ausdrücklich nicht erlaubt.</li> 	<li>Auf dem Foto muss immer die ganze Gruppe (ausser der Fotograf) und die Station/Objekt im Bild sein.</li> 	<li>Die Gruppe darf sich nicht trennen.</li> 	<li>Wir sind Teil der Pfadi und verhalten uns auch so.</li> </ul>  <h5>Häufige Fragen / Tipps &amp; Tricks</h5> <ul> 	<li>Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht 		viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen. 	</li> 	<li>Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird) 		<ul> 			<li>Android / Google Handy:<br/> In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe 				Genauigkeit“ gestellt werden. Der Energiesparmodus muss ausgeschaltet sein. Bei Android immer die App 				verwenden. 			</li> 			<li>iPhone / Apple Handy:<br/> In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.</li> 		</ul> 	</li> 	<li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li> </ul>'),
('map_center_lat','47.497422'),
('map_center_long','8.722104'),
('riddle_radius','100'),
('station_radius','100'),
('passcode_page_text', 'Spielinfos auf der Passcode Seite');

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
`t_ID` int(11) DEFAULT NULL COMMENT 'team ID',
`img_ID` varchar(255) NOT NULL DEFAULT 'image filename',
PRIMARY KEY (`l_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



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
(1,'Mr.X','bisSchen32verordne');

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
(1,'test','test',NULL);

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
(1,'admin','admin');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
