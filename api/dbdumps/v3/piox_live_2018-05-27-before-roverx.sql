# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27-0ubuntu1)
# Datenbank: piox_live
# Erstellt am: 2018-05-27 11:36:24 +0000
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
	('home_location_lat','47.503288'),
	('home_location_long','8.737874'),
	('home_location_title','Startpunkt'),
	('info_text','<h3>Spielregeln</h3> <h5>Wie funktioniert das Spiel?</h5> Wer am Ende am meisten Punkte hat, gewinnt. Punkte könnt Ihr auf drei Arten machen: <ul> 	<li>Stationen erobern<br/> Überall in der Stadt gibt es Stationen die deine Gruppe einnehmen kann. Klickt auf die 		Station, macht ein Foto <b>von eurer ganzen Gruppe</b> und ladet das Foto hoch. Damit gehört die Station euch! Zumindest solange Sie euch kein anderes Team wegschnappt. Alle 5 Minuten 		bekommt Ihr Punkte für jede Station in eurem Besitz. 	</li> 	<li>Mister X<br/> In der Stadt sind einige Mister X unterwegs. Ihr seht 		sie anhand vom Pio-X Logo auf der Karte. Sobald Ihr einen gefangen habt, bekommt Ihr einen Passcode, welcher 		euch viele Bonuspunkte bringt. 	</li> 	<li>Rätsel lösen<br/> Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen 		seid, könnt ihr die Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien. 		Rätselserien geben komplett gelöst deutlich mehr Punkte als Einzelrätsel. 	</li> </ul>  <h5>Regeln</h5> <ul> 	<li>Man darf nur zu Fuss unterwegs sein. Velos sind ausdrücklich nicht erlaubt.</li> 	<li>Auf dem Foto muss immer die ganze Gruppe (ausser der Fotograf) und die Station/Objekt im Bild sein.</li> 	<li>Die Gruppe darf sich nicht trennen.</li> 	<li>Wir sind Teil der Pfadi und verhalten uns auch so.</li> </ul>  <h5>Häufige Fragen / Tipps &amp; Tricks</h5> <ul> 	<li>Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht 		viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen. 	</li> 	<li>Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird) 		<ul> 			<li>Android / Google Handy:<br/> In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe 				Genauigkeit“ gestellt werden. Der Energiesparmodus muss ausgeschaltet sein. Bei Android immer die App 				verwenden. 			</li> 			<li>iPhone / Apple Handy:<br/> In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.</li> 		</ul> 	</li> 	<li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li> </ul> <h5>Hilfe!</h5> <p> 	Wenn ihr Probleme irgendwelcher Art habt, meldet euch <b>per Whatsapp oder SMS</b> auf 	der Notfallnummer. Meldet euch immer per Chat, Anrufe nur bei einem Notfall! Die Notfallnummer lautet 079 542 79 35.<br> 	<b>Bei medizinischen Notfällen direkt die Ambulanz (144) anrufen</b> und anschliessend die Notfallnummer.<br/> <br> 	Notfallnummer: 079 542 79 35 </p>  <h5>Start & Ende</h5> <p> 	Spielstart: ca. 14:15<br> 	Spielende: 15:30<br> 	Rangverkündigung: 16:00 Uhr, bei Punkt<br> 	Ende: Open End mit BBQ </p>'),
	('map_center_lat','47.503288'),
	('map_center_long','8.737874'),
	('passcode_page_subtitle','Der etwas andere Rover Wettkampf!'),
	('passcode_page_text','Spielinfos auf der Passcode Seite'),
	('passcode_page_title','Rover – X 2018'),
	('riddle_radius','100'),
	('station_radius','50');

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
  PRIMARY KEY (`l_ID`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;

INSERT INTO `log` (`l_ID`, `timestamp`, `text`, `type`, `FK_ID`, `t_ID`, `img_ID`)
VALUES
	(1,'2018-05-27 13:18:55','Team Dänemark hat die Station \"Oststrasse\" eingenommen','STATION',1,14,'capture_s45_t14_1527419935087'),
	(2,'2018-05-27 13:19:11','Team Dänemark hat das Rätsel \"Anestellerei\" freigeschaltet','RIDDLE',3,14,''),
	(3,'2018-05-27 13:19:21','Team Dänemark hat Rätsel \"Anestellerei\" richtig gelöst','RIDDLE',3,14,''),
	(4,'2018-05-27 13:35:01','Team Dänemark hat das Teambild geändert.','PROFILE',14,14,'team_14_1527420901266');

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
	(1,'Rover X','JahrestaghervorgetreteneVerzichtserklaerung');

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

LOCK TABLES `passcode` WRITE;
/*!40000 ALTER TABLE `passcode` DISABLE KEYS */;

INSERT INTO `passcode` (`p_ID`, `code`, `points`, `used`, `mrx_ID`)
VALUES
	(1,'194064',600,0,1),
	(2,'137181',600,0,1),
	(3,'118682',600,0,1),
	(4,'149397',600,0,1),
	(5,'174132',600,0,1),
	(6,'109837',600,0,1),
	(7,'122618',600,0,1),
	(8,'187086',600,0,1),
	(9,'195783',600,0,1),
	(10,'181395',600,0,1),
	(11,'123617',600,0,1),
	(12,'181845',600,0,1),
	(13,'153314',600,0,1),
	(14,'137884',600,0,1),
	(15,'117190',600,0,1),
	(16,'132247',600,0,1),
	(17,'132572',600,0,1),
	(18,'194044',600,0,1),
	(19,'144474',600,0,1),
	(20,'107356',600,0,1);

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
  PRIMARY KEY (`rtp_ID`),
  KEY `t_ID` (`t_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_points` WRITE;
/*!40000 ALTER TABLE `r_team_points` DISABLE KEYS */;

INSERT INTO `r_team_points` (`rtp_ID`, `t_ID`, `points`, `type`, `timestamp`, `FK_ID`)
VALUES
	(1,14,40,'RIDDLE','2018-05-27 13:19:21',3),
	(2,14,10,'STATION','2018-05-27 13:20:01',45),
	(3,14,10,'STATION','2018-05-27 13:25:01',45),
	(4,14,10,'STATION','2018-05-27 13:35:01',45);

/*!40000 ALTER TABLE `r_team_points` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle r_team_riddle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `r_team_riddle`;

CREATE TABLE `r_team_riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'FK riddle ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `state` enum('LOCKED','UNLOCKED','SOLVED') NOT NULL DEFAULT 'LOCKED' COMMENT 'riddle state',
  `img_ID` varchar(255) NOT NULL DEFAULT '' COMMENT 'team img of riddle',
  PRIMARY KEY (`r_ID`,`t_ID`),
  KEY `t_ID` (`t_ID`,`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_riddle` WRITE;
/*!40000 ALTER TABLE `r_team_riddle` DISABLE KEYS */;

INSERT INTO `r_team_riddle` (`r_ID`, `t_ID`, `state`, `img_ID`)
VALUES
	(3,14,'SOLVED','');

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
  PRIMARY KEY (`rts_ID`),
  KEY `s_ID` (`s_ID`,`timestamp`),
  KEY `t_ID` (`t_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `r_team_station` WRITE;
/*!40000 ALTER TABLE `r_team_station` DISABLE KEYS */;

INSERT INTO `r_team_station` (`rts_ID`, `s_ID`, `t_ID`, `timestamp`, `img_ID`)
VALUES
	(1,45,14,'2018-05-27 13:18:55','capture_s45_t14_1527419935087');

/*!40000 ALTER TABLE `r_team_station` ENABLE KEYS */;
UNLOCK TABLES;


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
	(1,47.502306206942,8.739446775358,'Tierischi Underfüehrig','Was für Tiere (Mehrzahl) sieht man hier?',NULL,'Fische','SINGLE',30,1,0),
	(2,47.503007862126,8.7402317111528,'Underground','Was befindet sich hier?',0,'Höhle','SINGLE',30,1,0),
	(3,47.503856638064,8.7382039301676,'Anestellerei','Welches Fortbewegungsmittel kann man hier parken?',NULL,'Velo','SINGLE',40,1,0),
	(4,47.500100797087,8.7348453640109,'Bis der Tod uns scheidet ...','Mach ein Foto zu der Tätigkeit, welche in diesem Gebäude üblich ist',0,'','SINGLE',60,0,1),
	(5,47.503001757011,8.7314262551602,'Spiegelskultpur','Mach ein Selfie während du im Handstand bist.',NULL,NULL,'SINGLE',60,0,1);

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
	(1,47.503660961697,8.7309218211039,10,'Bezirksgericht','',1),
	(2,47.504694361432,8.7325803202799,10,'Underfüehrig West','',1),
	(3,47.502820211192,8.7309432787761,10,'Münzkabinett','',1),
	(4,47.503436279691,8.732016162382,10,'Parkplatz','',1),
	(5,47.504092803163,8.7341467303446,10,'Grossi Velo Underfüehrig','',1),
	(6,47.501827238512,8.732016162382,10,'Trollstrasse','',1),
	(7,47.502947649093,8.7375585002115,10,'Stägli uf Stägli ab','',1),
	(8,47.501203903001,8.7331105036601,10,'Bloooom Bloooom','',1),
	(9,47.499544054908,8.7338400645122,10,'Löwenbrunnen','',1),
	(10,47.499870230073,8.7352026266917,10,'Tweet Tweet','',1),
	(11,47.501236394459,8.7430623931101,10,'Überfüehrig Ost','',1),
	(12,47.499471571262,8.7376917166575,10,'Silk Road','',1),
	(13,47.499536806548,8.7402666373118,10,'Roschee Fäderer','',1),
	(14,47.502077170329,8.7395862502268,10,'Bahnhüsli','',1),
	(15,47.501091431741,8.7392429274729,10,'Christliches Altersheim','',1),
	(16,47.4997760019,8.7443650526866,10,'Ich MAAG di net','',1),
	(17,47.501381356776,8.7378481787852,10,'Sambesi','',1),
	(18,47.499522994131,8.7433726353511,10,'Pärkli','',1),
	(19,47.499482732626,8.7421542419061,10,'Da war doch mal was...','',1),
	(20,47.500334096956,8.7423734550512,10,'Pollux','',1),
	(21,47.50180547118,8.743972051624,10,'Giga','',1),
	(22,47.500522464733,8.7352041465576,10,'Schrotthaufen','',1),
	(23,47.499373450129,8.7362341148194,10,'Villenquartier','',1),
	(24,47.506028097362,8.7341953997648,10,'Musigschuel','',1),
	(25,47.505201879928,8.7349035029447,10,'Konsi','',1),
	(26,47.500516397613,8.7376288635071,10,'Palmenstrand ..äh -strasse','',1),
	(27,47.505455544558,8.7336160426175,10,'Musigschuelpärkli','',1),
	(28,47.502524605442,8.7329260677056,10,'Odd Fellow Haus','',1),
	(29,47.502534855587,8.7342886298852,10,'Trööt Trööt','',1),
	(30,47.504296828474,8.7395920043027,10,'Gymi Lee','',1),
	(31,47.505072327004,8.7370599989927,10,'Gimy Rychi','',1),
	(32,47.504630221769,8.7378110175168,10,'Aula','',1),
	(33,47.505028841408,8.7359978442228,10,'Mampfmampf','',1),
	(34,47.500227996596,8.7391394048886,10,'Pflanzschulstrasse','',1),
	(35,47.502314224545,8.7415231947934,10,'Chilligs Hängerplätzli','',1),
	(36,47.500863130177,8.7407402259644,10,'SWICA','',1),
	(37,47.501479975998,8.7416950923737,10,'Dead End','',1),
	(38,47.502001710367,8.734354861183,10,'Freimuurer','',1),
	(39,47.502406593621,8.7350120023916,10,'Heilsarmee','',1),
	(40,47.503969778094,8.7363584713171,10,'Ringsumrenndings','',1),
	(41,47.501545572327,8.7362984878357,10,'Kreuzung Museumsstrasse','',1),
	(42,47.503426002273,8.7405288541656,10,'Villa am Leesteig','',1),
	(43,47.500438632921,8.745543243919,10,'Brücke','',1),
	(44,47.503268992791,8.7338595414501,10,'Nelkenstrasse','',1),
	(45,47.503142294148,8.7384818059738,10,'Oststrasse','',1),
	(46,47.502205162754,8.7374236745175,10,'frisch-nah-günstig','',1),
	(47,47.503316580903,8.7358291012581,10,'Bahnstrasse','',1),
	(48,47.50146105722,8.746014522819,10,'No öppe en Tritt ...','',1),
	(49,47.501076906786,8.7446841471476,10,'Schikane','',1),
	(50,47.502048149621,8.7447699778361,10,'Bushaltestell','',1),
	(51,47.502964502118,8.7427679515309,10,'Bonzerei','',1),
	(52,47.503943373771,8.7408850408025,10,'Bäumlistäge','',1),
	(53,47.504564236145,8.7307710417369,10,'Gfägnis','',1);

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
	(1,'Schweiz','stoerrischsteBitpatternunmaessig',NULL),
	(2,'Spanien','gethronterGebrauchtwagenhandeldetailierend',NULL),
	(3,'Brasilien','konjunkturdaempfendeunvermuteterzurueckverwandelnden',NULL),
	(4,'Schweden','vollgetankteeingeplantenmitbenutztem',NULL),
	(5,'Japan','kampierenderwaermtetgelbgruen',NULL),
	(6,'Kanada','aufrufendemSachwertZahlenlotto',NULL),
	(7,'Russland','verehrungswuerdigenKassakurseLehranstalt',NULL),
	(8,'Holland','ueberreizterWissensdurstPanzerlandungsboote',NULL),
	(9,'Griechenland','saeurebestaendigstemMaisGedankengut',NULL),
	(10,'Australien','FristenmodellweitabWanderinnen',NULL),
	(11,'Italien','SchulschlussungeratensteMadonna',NULL),
	(12,'Portugal','gedrucktesBildwolkenloseres',NULL),
	(13,'Thailand','auftreibendzusammenschnuerendenservieren',NULL),
	(14,'Dänemark','uebersichtlichstenmitgemachteamigos','team_14_1527420901266');

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
  PRIMARY KEY (`tp_ID`),
  KEY `t_ID` (`t_ID`,`player`(191),`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `teamposition` WRITE;
/*!40000 ALTER TABLE `teamposition` DISABLE KEYS */;

INSERT INTO `teamposition` (`tp_ID`, `team_lat`, `team_long`, `t_ID`, `player`, `timestamp`)
VALUES
	(1,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:26'),
	(2,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:28'),
	(3,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:28'),
	(4,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:28'),
	(5,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:28'),
	(6,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:28'),
	(7,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(8,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(9,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(10,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(11,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(12,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(13,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(14,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(15,47.5030736,8.7379528,14,'F?ger','2018-05-27 13:02:30'),
	(16,47.503118,8.7379738,14,'F?ger','2018-05-27 13:02:41'),
	(17,47.503118,8.7379738,14,'F?ger','2018-05-27 13:02:41'),
	(18,47.5031108,8.7379756,14,'F?ger','2018-05-27 13:02:56'),
	(19,47.5031108,8.7379756,14,'F?ger','2018-05-27 13:02:56'),
	(20,47.5031108,8.7379756,14,'F?ger','2018-05-27 13:03:11'),
	(21,47.5031108,8.7379756,14,'F?ger','2018-05-27 13:03:11'),
	(22,47.5031013,8.7379836,14,'F?ger','2018-05-27 13:03:26'),
	(23,47.5031013,8.7379836,14,'F?ger','2018-05-27 13:03:26'),
	(24,47.5031013,8.7379836,14,'F?ger','2018-05-27 13:03:26'),
	(25,47.5031013,8.7379836,14,'F?ger','2018-05-27 13:03:26'),
	(26,47.5031013,8.7379836,14,'F?ger','2018-05-27 13:03:28'),
	(27,47.5031047,8.7379729,14,'F?ger','2018-05-27 13:03:41'),
	(28,47.5031047,8.7379729,14,'F?ger','2018-05-27 13:03:41'),
	(29,47.503103,8.7379728,14,'F?ger','2018-05-27 13:03:56'),
	(30,47.503103,8.7379728,14,'F?ger','2018-05-27 13:03:56'),
	(31,47.5034887,8.738344,14,'F?ger','2018-05-27 13:04:11'),
	(32,47.5034887,8.738344,14,'F?ger','2018-05-27 13:04:11'),
	(33,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:25'),
	(34,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:25'),
	(35,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:25'),
	(36,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:25'),
	(37,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:25'),
	(38,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:26'),
	(39,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:26'),
	(40,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:26'),
	(41,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:26'),
	(42,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:28'),
	(43,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:41'),
	(44,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:41'),
	(45,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:47'),
	(46,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:47'),
	(47,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:47'),
	(48,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:48'),
	(49,47.5034887,8.7383439,14,'F?ger','2018-05-27 13:04:48'),
	(50,47.5031068,8.7379828,14,'F?ger','2018-05-27 13:04:56'),
	(51,47.5031068,8.7379828,14,'F?ger','2018-05-27 13:04:56'),
	(52,47.5031135,8.7379762,14,'F?ger','2018-05-27 13:05:09'),
	(53,47.5031135,8.7379762,14,'F?ger','2018-05-27 13:05:11'),
	(54,47.5031135,8.7379762,14,'F?ger','2018-05-27 13:05:11'),
	(55,47.5031135,8.7379762,14,'F?ger','2018-05-27 13:05:13'),
	(56,47.5031153,8.7379761,14,'F?ger','2018-05-27 13:05:16'),
	(57,47.503119,8.7379746,14,'F?ger','2018-05-27 13:05:26'),
	(58,47.503119,8.7379746,14,'F?ger','2018-05-27 13:05:26'),
	(59,47.5031043,8.7379818,14,'F?ger','2018-05-27 13:05:26'),
	(60,47.5031043,8.7379818,14,'F?ger','2018-05-27 13:05:26'),
	(61,47.5031043,8.7379818,14,'F?ger','2018-05-27 13:05:28'),
	(62,47.5031058,8.7379833,14,'F?ger','2018-05-27 13:05:41'),
	(63,47.5031058,8.7379833,14,'F?ger','2018-05-27 13:05:41'),
	(64,47.5031182,8.7379741,14,'F?ger','2018-05-27 13:05:56'),
	(65,47.5031182,8.7379741,14,'F?ger','2018-05-27 13:05:56'),
	(66,47.5031043,8.7379818,14,'F?ger','2018-05-27 13:06:11'),
	(67,47.5031043,8.7379818,14,'F?ger','2018-05-27 13:06:11'),
	(68,47.5031159,8.7379767,14,'F?ger','2018-05-27 13:06:26'),
	(69,47.5031159,8.7379767,14,'F?ger','2018-05-27 13:06:26'),
	(70,47.5031159,8.7379767,14,'F?ger','2018-05-27 13:06:26'),
	(71,47.5031159,8.7379767,14,'F?ger','2018-05-27 13:06:26'),
	(72,47.5031135,8.7379762,14,'F?ger','2018-05-27 13:06:28'),
	(73,47.5031014,8.7379836,14,'F?ger','2018-05-27 13:06:35'),
	(74,47.5031014,8.7379836,14,'F?ger','2018-05-27 13:06:35'),
	(75,47.5031014,8.7379836,14,'F?ger','2018-05-27 13:06:35'),
	(76,47.5031014,8.7379836,14,'F?ger','2018-05-27 13:06:35'),
	(77,47.5031014,8.7379836,14,'F?ger','2018-05-27 13:06:35'),
	(78,47.5031134,8.7379762,14,'F?ger','2018-05-27 13:06:41'),
	(79,47.5031134,8.7379762,14,'F?ger','2018-05-27 13:06:41'),
	(80,47.503109,8.7379837,14,'F?ger','2018-05-27 13:06:56'),
	(81,47.503109,8.7379837,14,'F?ger','2018-05-27 13:06:56'),
	(82,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:11'),
	(83,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:11'),
	(84,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:13'),
	(85,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:13'),
	(86,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:13'),
	(87,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:13'),
	(88,47.5031148,8.7379776,14,'F?ger','2018-05-27 13:07:13'),
	(89,47.5031068,8.7379827,14,'F?ger','2018-05-27 13:07:26'),
	(90,47.5031068,8.7379827,14,'F?ger','2018-05-27 13:07:26'),
	(91,47.5031068,8.7379827,14,'F?ger','2018-05-27 13:07:26'),
	(92,47.5031068,8.7379827,14,'F?ger','2018-05-27 13:07:26'),
	(93,47.5031108,8.7379756,14,'F?ger','2018-05-27 13:07:28'),
	(94,47.5031042,8.7379818,14,'F?ger','2018-05-27 13:07:38'),
	(95,47.5031042,8.7379818,14,'F?ger','2018-05-27 13:07:38'),
	(96,47.5031042,8.7379818,14,'F?ger','2018-05-27 13:07:38'),
	(97,47.5031042,8.7379818,14,'F?ger','2018-05-27 13:07:38'),
	(98,47.5031042,8.7379818,14,'F?ger','2018-05-27 13:07:38'),
	(99,47.5031059,8.7379821,14,'F?ger','2018-05-27 13:07:41'),
	(100,47.5031059,8.7379821,14,'F?ger','2018-05-27 13:07:41'),
	(101,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:51'),
	(102,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:52'),
	(103,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:52'),
	(104,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:52'),
	(105,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:52'),
	(106,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:56'),
	(107,47.5031048,8.7379728,14,'F?ger','2018-05-27 13:07:56'),
	(108,47.5031127,8.7379754,14,'F?ger','2018-05-27 13:08:11'),
	(109,47.5031127,8.7379754,14,'F?ger','2018-05-27 13:08:11'),
	(110,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:14'),
	(111,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(112,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(113,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(114,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(115,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(116,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(117,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(118,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(119,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(120,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(121,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(122,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(123,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:15'),
	(124,47.5030982,8.737967,14,'F?ger','2018-05-27 13:12:16'),
	(125,47.5031077,8.7379733,14,'F?ger','2018-05-27 13:12:22'),
	(126,47.5031077,8.7379733,14,'F?ger','2018-05-27 13:12:22'),
	(127,47.5031038,8.7379735,14,'F?ger','2018-05-27 13:12:24'),
	(128,47.5031038,8.7379735,14,'F?ger','2018-05-27 13:12:24'),
	(129,47.5031038,8.7379735,14,'F?ger','2018-05-27 13:12:24'),
	(130,47.5031038,8.7379735,14,'F?ger','2018-05-27 13:12:24'),
	(131,47.5031038,8.7379735,14,'F?ger','2018-05-27 13:12:24'),
	(132,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(133,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(134,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(135,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(136,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(137,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(138,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(139,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(140,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(141,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(142,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(143,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:42'),
	(144,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:43'),
	(145,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:43'),
	(146,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:43'),
	(147,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:56'),
	(148,47.4997252,8.7397621,14,'Püge','2018-05-27 13:16:56'),
	(149,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:11'),
	(150,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:11'),
	(151,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:26'),
	(152,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:26'),
	(153,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:41'),
	(154,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:41'),
	(155,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:41'),
	(156,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:41'),
	(157,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:41'),
	(158,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:56'),
	(159,47.4997252,8.7397621,14,'Püge','2018-05-27 13:17:56'),
	(160,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:11'),
	(161,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:11'),
	(162,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(163,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(164,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(165,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(166,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(167,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(168,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(169,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(170,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(171,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(172,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:21'),
	(173,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:22'),
	(174,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:22'),
	(175,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:22'),
	(176,47.5031059,8.7379784,14,'P?ge','2018-05-27 13:18:22'),
	(177,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:26'),
	(178,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:26'),
	(179,47.5031064,8.737975,14,'P?ge','2018-05-27 13:18:36'),
	(180,47.5031064,8.737975,14,'P?ge','2018-05-27 13:18:36'),
	(181,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:41'),
	(182,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:41'),
	(183,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:41'),
	(184,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:41'),
	(185,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:41'),
	(186,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(187,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(188,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(189,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(190,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(191,47.5031115,8.7379744,14,'P?ge','2018-05-27 13:18:55'),
	(192,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:56'),
	(193,47.4997252,8.7397621,14,'Püge','2018-05-27 13:18:56'),
	(194,47.5031107,8.7379728,14,'P?ge','2018-05-27 13:19:07'),
	(195,47.5031107,8.7379728,14,'P?ge','2018-05-27 13:19:07'),
	(196,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:11'),
	(197,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:11'),
	(198,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:11'),
	(199,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:11'),
	(200,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:21'),
	(201,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:21'),
	(202,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:23'),
	(203,47.5031085,8.7379733,14,'P?ge','2018-05-27 13:19:23'),
	(204,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:26'),
	(205,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:26'),
	(206,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:41'),
	(207,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:41'),
	(208,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:41'),
	(209,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:41'),
	(210,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:41'),
	(211,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:56'),
	(212,47.4997252,8.7397621,14,'Püge','2018-05-27 13:19:56'),
	(213,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:11'),
	(214,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:11'),
	(215,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:26'),
	(216,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:26'),
	(217,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:41'),
	(218,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:41'),
	(219,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:41'),
	(220,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:41'),
	(221,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:41'),
	(222,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:56'),
	(223,47.4997252,8.7397621,14,'Püge','2018-05-27 13:20:56'),
	(224,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:11'),
	(225,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:11'),
	(226,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:26'),
	(227,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:26'),
	(228,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:41'),
	(229,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:41'),
	(230,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:41'),
	(231,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:41'),
	(232,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:41'),
	(233,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:56'),
	(234,47.4997252,8.7397621,14,'Püge','2018-05-27 13:21:56'),
	(235,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:11'),
	(236,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:11'),
	(237,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:26'),
	(238,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:26'),
	(239,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:41'),
	(240,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:41'),
	(241,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:41'),
	(242,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:41'),
	(243,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:41'),
	(244,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:56'),
	(245,47.4997252,8.7397621,14,'Püge','2018-05-27 13:22:56'),
	(246,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:11'),
	(247,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:11'),
	(248,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:26'),
	(249,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:26'),
	(250,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:41'),
	(251,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:41'),
	(252,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:41'),
	(253,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:41'),
	(254,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:41'),
	(255,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:56'),
	(256,47.4997252,8.7397621,14,'Püge','2018-05-27 13:23:56'),
	(257,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:11'),
	(258,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:11'),
	(259,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:26'),
	(260,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:26'),
	(261,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:41'),
	(262,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:41'),
	(263,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:41'),
	(264,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:41'),
	(265,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:41'),
	(266,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:56'),
	(267,47.4997252,8.7397621,14,'Püge','2018-05-27 13:24:56'),
	(268,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:11'),
	(269,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:11'),
	(270,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:26'),
	(271,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:26'),
	(272,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:41'),
	(273,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:41'),
	(274,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:41'),
	(275,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:41'),
	(276,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:41'),
	(277,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:56'),
	(278,47.4997252,8.7397621,14,'Püge','2018-05-27 13:25:56'),
	(279,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:11'),
	(280,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:11'),
	(281,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:26'),
	(282,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:26'),
	(283,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(284,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(285,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(286,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(287,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(288,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:41'),
	(289,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:56'),
	(290,47.4997252,8.7397621,14,'Püge','2018-05-27 13:26:56'),
	(291,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:12'),
	(292,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:12'),
	(293,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:26'),
	(294,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:26'),
	(295,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:41'),
	(296,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:41'),
	(297,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:41'),
	(298,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:41'),
	(299,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:41'),
	(300,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:56'),
	(301,47.4997252,8.7397621,14,'Püge','2018-05-27 13:27:56'),
	(302,47.4997252,8.7397621,14,'Püge','2018-05-27 13:28:11'),
	(303,47.4997252,8.7397621,14,'Püge','2018-05-27 13:28:11'),
	(304,47.4997252,8.7397621,14,'Püge','2018-05-27 13:28:26'),
	(305,47.4997252,8.7397621,14,'Püge','2018-05-27 13:28:26'),
	(306,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:11'),
	(307,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:11'),
	(308,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:26'),
	(309,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:26'),
	(310,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:41'),
	(311,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:41'),
	(312,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:41'),
	(313,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:41'),
	(314,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:41'),
	(315,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:56'),
	(316,47.4997252,8.7397621,14,'Püge','2018-05-27 13:33:57'),
	(317,47.5030531,8.7381586,14,'F?ger','2018-05-27 13:34:24'),
	(318,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:01'),
	(319,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:01'),
	(320,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:14'),
	(321,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:14'),
	(322,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:29'),
	(323,47.5030268,8.7381615,14,'F?ger','2018-05-27 13:35:29'),
	(324,47.5030078,8.7381393,14,'F?ger','2018-05-27 13:35:44'),
	(325,47.5030078,8.7381393,14,'F?ger','2018-05-27 13:35:44'),
	(326,47.5031047,8.7379658,14,'F?ger','2018-05-27 13:35:59'),
	(327,47.5031047,8.7379658,14,'F?ger','2018-05-27 13:35:59'),
	(328,47.5031047,8.7379658,14,'F?ger','2018-05-27 13:35:59'),
	(329,47.5031047,8.7379658,14,'F?ger','2018-05-27 13:35:59'),
	(330,47.5031047,8.7379658,14,'F?ger','2018-05-27 13:35:59'),
	(331,47.5031076,8.7379675,14,'F?ger','2018-05-27 13:36:14'),
	(332,47.5031076,8.7379675,14,'F?ger','2018-05-27 13:36:14'),
	(333,47.5031051,8.7379653,14,'F?ger','2018-05-27 13:36:29'),
	(334,47.5031051,8.7379653,14,'F?ger','2018-05-27 13:36:29');

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
	(2,'admin','Strasse9Wolf');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
