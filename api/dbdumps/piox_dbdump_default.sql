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
	(1,'Mr.X','bisSchen32verordne'),
	(2,'Mr.Y','vermuten83erzaehlend'),
	(3,'Mr.Z','entzerrst37Mittwoch'),
	(4,'Mr.R','vorkommen84mittwochs');

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
	(1,'146471',1000,0,1),
	(2,'881881',1000,0,1),
	(3,'369685',1000,0,1),
	(4,'488857',1000,0,1),
	(5,'171847',1000,0,1),
	(6,'654237',1000,0,1),
	(7,'225294',1000,0,1),
	(8,'231188',1000,0,1),
	(9,'636412',1000,0,1),
	(10,'129293',1000,0,1),
	(11,'968371',1000,0,1),
	(12,'983512',1000,0,1),
	(13,'825833',1000,0,1),
	(14,'795436',1000,0,1),
	(15,'638558',1000,0,1),
	(16,'744672',1000,0,1),
	(17,'771921',1000,0,1),
	(18,'213695',1000,0,1),
	(19,'865497',1000,0,1),
	(20,'161815',1000,0,1),
	(21,'688945',1000,0,1),
	(22,'212294',1000,0,1),
	(23,'214473',1000,0,1),
	(24,'968498',1000,0,1),
	(25,'214285',1000,0,1),
	(26,'653556',1000,0,1),
	(27,'967276',1000,0,1),
	(28,'597844',1000,0,1),
	(29,'239179',1000,0,1),
	(30,'725864',1000,0,1),
	(31,'254284',1000,0,2),
	(32,'229511',1000,0,2),
	(33,'129321',1000,0,2),
	(34,'656712',1000,0,2),
	(35,'876617',1000,0,2),
	(36,'777766',1000,0,2),
	(37,'412678',1000,0,2),
	(38,'462591',1000,0,2),
	(39,'823967',1000,0,2),
	(40,'829416',1000,0,2),
	(41,'453892',1000,0,2),
	(42,'654891',1000,0,2),
	(43,'546796',1000,0,2),
	(44,'887273',1000,0,2),
	(45,'965996',1000,0,2),
	(46,'542831',1000,0,2),
	(47,'986375',1000,0,2),
	(48,'429998',1000,0,2),
	(49,'576384',1000,0,2),
	(50,'689278',1000,0,2),
	(51,'723895',1000,0,2),
	(52,'993529',1000,0,2),
	(53,'162161',1000,0,2),
	(54,'918647',1000,0,2),
	(55,'915822',1000,0,2),
	(56,'793173',1000,0,2),
	(57,'562824',1000,0,2),
	(58,'739935',1000,0,2),
	(59,'126879',1000,0,2),
	(60,'571962',1000,0,2),
	(61,'621823',1000,0,3),
	(62,'859221',1000,0,3),
	(63,'632268',1000,0,3),
	(64,'535326',1000,0,3),
	(65,'312252',1000,0,3),
	(66,'513694',1000,0,3),
	(67,'889791',1000,0,3),
	(68,'863988',1000,0,3),
	(69,'732353',1000,0,3),
	(70,'884198',1000,0,3),
	(71,'259418',1000,0,3),
	(72,'886766',1000,0,3),
	(73,'843241',1000,0,3),
	(74,'113248',1000,0,3),
	(75,'427826',1000,0,3),
	(76,'631671',1000,0,3),
	(77,'469146',1000,0,3),
	(78,'721934',1000,0,3),
	(79,'135458',1000,0,3),
	(80,'281962',1000,0,3),
	(81,'535583',1000,0,3),
	(82,'639643',1000,0,3),
	(83,'315317',1000,0,3),
	(84,'711346',1000,0,3),
	(85,'164151',1000,0,3),
	(86,'394852',1000,0,3),
	(87,'125988',1000,0,3),
	(88,'318748',1000,0,3),
	(89,'519633',1000,0,3),
	(90,'249544',1000,0,3),
	(91,'118367',1000,0,4),
	(92,'674913',1000,0,4),
	(93,'489438',1000,0,4),
	(94,'443665',1000,0,4),
	(95,'495988',1000,0,4),
	(96,'589425',1000,0,4),
	(97,'173573',1000,0,4),
	(98,'712654',1000,0,4),
	(99,'588755',1000,0,4),
	(100,'294782',1000,0,4),
	(101,'641572',1000,0,4),
	(102,'179336',1000,0,4),
	(103,'697762',1000,0,4),
	(104,'221985',1000,0,4),
	(105,'415783',1000,0,4),
	(106,'946993',1000,0,4),
	(107,'191134',1000,0,4),
	(108,'693469',1000,0,4),
	(109,'681679',1000,0,4),
	(110,'832766',1000,0,4),
	(111,'365898',1000,0,4),
	(112,'686633',1000,0,4),
	(113,'843443',1000,0,4),
	(114,'711462',1000,0,4),
	(115,'495926',1000,0,4),
	(116,'265948',1000,0,4),
	(117,'935329',1000,0,4),
	(118,'415747',1000,0,4),
	(119,'133578',1000,0,4),
	(120,'218611',1000,0,4),
	(121,'847194',500,0,1);

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
	(15,47.498720344488,8.7262558937073,'Kiwi (Serie 1/7)','Der Kiwi Maxx hat sich im Kiwi Kino im Popcorn verkrochen. Um ihn wieder herauszuholen müsst ihr eine bekannte Filmszene Nachspielen. Bei jedem Rätsel müsst ihr ein Foto der Story hochladen und erhaltet dafür Punkte. Total Punkte: 500',NULL,NULL,'MULTI',50,0,1),
	(16,0,0,'Kiwi (Serie 2/7)','Foto 2',15,'','MULTI',50,0,1),
	(17,0,0,'Kiwi (Serie 3/7)','Foto 3',16,'','MULTI',50,0,1),
	(18,0,0,'Kiwi (Serie 4/7)','Foto 4',17,'','MULTI',50,0,1),
	(19,0,0,'Kiwi (Serie 5/7)','Foto 5',18,'','MULTI',50,0,1),
	(20,0,0,'Kiwi (Serie 6/7)','Foto 6',19,'','MULTI',50,0,1),
	(21,0,0,'Kiwi (Serie 7/7)','Foto 7',20,'','MULTI',200,0,1),
	(22,47.499938073871,8.7233591079712,'Elefant (Serie 1/5)','Der Elefant hat sein Foto-Tagebuch beim Schiffbruch verloren und ist sehr vergesslich. Daher müssen wir ihm eine Foto-Love-Story machen, wie er mit dem Nilpferd Aphrodite zusammengefunden hat. \nDie Foto-Love-Story führt dich durch die Stadt bis zur Stadtkirche. Die erste Szene spielt beim Bahnhof. Total Punkte: 400',NULL,NULL,'MULTI',50,0,1),
	(23,47.500633906552,8.7255907058716,'Elefant (Serie 2/5)','Die nächste Szene spielt beim Manor.',22,'','MULTI',50,0,1),
	(24,47.500800615096,8.7281227111816,'Elefant (Serie 3/5)','Weiter gehts mit der Foto-Love-Story im Stadpark',23,'','MULTI',50,0,1),
	(25,47.499234983566,8.7311482429504,'Elefant (Serie 4/5)','Wir sind im Oberen Graben, die Story neigt sich dem Ende zu...',24,'','MULTI',50,0,1),
	(26,47.49895954356,8.7290561199188,'Elefant (Serie 5/5)','Epische Abschluss Kussszene bei der Stadtkirche ;)',25,'','MULTI',200,0,1),
	(27,47.507365964198,8.7185847759247,'Delfin','Wieviele Delfine siehst du an der Wand springen?',NULL,'6','SINGLE',100,1,0);

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
	(69,47.474620890998,8.742767572403,10,'Sternwarte Eschenberg','Klein aber fein',1),
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
	(156,47.513525372615,8.7115198373795,10,'Güetli','Früehner sind da Rössli gumped',1),
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
	(217,47.503378873552,8.69648873806,10,'Waldschenki','Guete Ort zum Miete für Feschtli',1),
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
	(374,47.511824177323,8.7134617567062,10,'Gallispitz','',1),
	(375,47.508171502815,8.7022930383682,10,'Brüggli','',1),
	(376,47.496524011158,8.7121260166168,10,'Brüehlguet','',1),
	(377,47.49646352563,8.7083628773689,10,'Chrumme Tschuttiplatz','',1);

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
	(1,'test','test',NULL),
	(2,'Biber','verweigertEntscheidungsspielAuslaendern',NULL),
	(3,'Wildschwein','GeschichtslehrerTrapezenSelbstausschaltungen',NULL),
	(4,'Luchs','erbraechtenwasseraermstenAuswerterechner',NULL),
	(5,'Wolf','Beglaubigunganlaechelndespaltenlanger',NULL),
	(6,'Dachs','ueberschattestKlemmenmodulHause',NULL),
	(7,'Fuchs','gepruegeltentgegenhaltenLides',NULL),
	(8,'Fischotter','zweieinhalbAbgaengeStrafrechten',NULL),
	(9,'Elch','hagerTeewaegenWarten',NULL),
	(10,'Reh','rechteckigeserbetenerzurueckberufende',NULL),
	(11,'Gämse','HandwerkszeugenUreinwohnersvierteilen',NULL),
	(12,'Mufflon','GetreidepreisangleichungWetteransagersherrichtende',NULL),
	(13,'Steinbock','verlegenunrettbarererhandelseinig',NULL),
	(14,'Marder','vergleichbarebegruendenflehend',NULL),
	(15,'Wisent','StocksOesterreicherMaskenbaelle',NULL),
	(16,'Maulwurf','Berichtsheftdolmetschtfrueheres',NULL),
	(17,'Igel','Packungenbewirtentreuherzigeres',NULL),
	(18,'Siebenschläfer','publiziertemvielmaligerHintergrunde',NULL),
	(19,'Bisamratte','GasangriffeBauboomDruckschalters',NULL),
	(20,'Ziesel','SonderheftKonzerneigenenViertaktmotor',NULL);

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
