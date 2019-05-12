# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26-0ubuntu0.18.04.1)
# Datenbank: piox
# Erstellt am: 2019-05-12 11:30:41 +0000
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
	('home_location_lat','47.498907'),
	('home_location_long','8.7218921'),
	('home_location_title','Startpunkt'),
	('info_text','<h3>Spielregeln</h3>\n<h5>Wie funktioniert das Spiel?</h5>\nWer am Ende am meisten Punkte hat, gewinnt. Punkte könnt Ihr auf drei Arten machen: \n<ul> 	\n    <li>Stationen erobern<br/> \n        Überall in der Stadt gibt es Stationen die deine Gruppe einnehmen kann. Klickt auf die\n        Station, macht ein Foto <b>von eurer ganzen Gruppe</b> und ladet das Foto hoch. Damit \n        gehört die Station euch! Zumindest solange Sie euch kein anderes Team wegschnappt. \n        Alle 5 Minuten bekommt Ihr Punkte für jede Station in eurem Besitz. 	\n    </li>\n    <li>Mister X<br/> \n        In der Stadt ist ein Mister X unterwegs. (Punkt) Ihr seht sie anhand vom Pio-X Logo auf der\n        Karte. Sobald Ihr einen gefangen habt, bekommt Ihr einen Passcode, welcher euch viele \n        Bonuspunkte bringt. (Ohne diese Punkte gewinnen ist schwierig oder unmöglich)\n    </li> 	\n    <li>Rätsel lösen<br/>\n        Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen seid, könnt \n        ihr die Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien.\n        Rätselserien geben komplett gelöst deutlich mehr Punkte als Einzelrätsel. 	\n    </li> \n</ul>  \n<h5>Regeln</h5> \n<ul> 	\n    <li>Man darf nur zu Fuss unterwegs sein. Velos sind ausdrücklich nicht erlaubt.</li>\n    <li>Auf dem Foto muss immer die ganze Gruppe und die Station/Objekt im Bild sein.</li>\n    <li>Die Gruppe darf sich nicht trennen.</li>\n    <li>Wir sind Teil der Pfadi und verhalten uns auch so.</li>\n</ul>\n<h5>Häufige Fragen / Tipps &amp; Tricks</h5>\n<ul>\n    <li>Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht\n        viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen.\n    </li>\n    <li>Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird)\n        <ul>\n            <li>Android / Google Handy:<br/> \n                In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe Genauigkeit“ gestellt werden. \n                Der Energiesparmodus muss ausgeschaltet sein. Bei Android immer die App verwenden. 			\n            </li>\n            <li>iPhone / Apple Handy:<br/> \n                In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.\n            </li>\n        </ul>\n    </li>\n    <li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li> </ul>'),
	('map_center_lat','47.498907'),
	('map_center_long','8.7218921'),
	('mrx_qrcode_page_text','<h1>Was tun als Mister x?</h1>Spass haben!'),
	('passcode_page_text','<h2>Was muss ich als Erstes tun?</h2><p>  Wenn dein Team diesen Zettel erhalten hat, habt ihr bereits den Checkin hinter euch. So geht’s weiter:</p><ol>  <li>    <b>App herunterladen/öffnen:</b>    <ol>      <li>        Android (Google): App im Play Store herunterladen und den Code oben rechts scannen.        Sucht im Google Play nach „Pio-X“ oder tippt folgenden Link ein: http://bit.ly/2mUFWPJ      </li>      <li>        iPhone (Apple): Handycode (QR) oben rechts scannen oder mit dem Link einloggen. Fürs iPhone gibt es keine App, es wird direkt im Webbrowser gespielt. (Ab iOS 11 kann der QR Code direkt mit der Kamera gescannt werden. Ältere iPhones verwenden dafür die App „Scanbot“.)      </li>    </ol>  </li>  <li>    <b>Tutorial:</b> In der App hat es eine erste Station die als Tutorial dient. Klickt diese an und folge den Anweisungen. Dies dient auch als „Technik-Check“ um zu testen ob auf deinem Telefon alles wie gewünscht funktioniert. Falls etwas nicht klappt, melde dich beim Infostand.  </li>  <li>    <b>Teambild:</b> Klickt in der App auf „Rangliste“, dann ganz unten auf „Teambild ändern“ und macht ein Foto eurer Gruppe und ladet das Foto hoch.  </li></ol><p>  Wenn das geklappt hat, bist du und deine Gruppe startbereit. <b>Lest euch die Regeln durch</b> und besprecht eure Team-Strategie. Es funktioniert etwas nicht? Probiert es nochmals und kommt sonst zum Infostand, wir helfen euch dort weiter. Der Infostand ist beim Checkin.</p><h2>Zeitplan</h2><p>  Das Spiel beginnt, sobald alle bereit sind, als circa 14:15 Uhr und endet um 16:30 Uhr. Um 16:45 Uhr ist die Rangverkündigung. Nach der Rangverkündigung ist Schluss.</p><p> <b>Tipp:</b> Wenn ihr den Checkin gemacht und das Tutorial durchgespielt habt, dann macht euch schon vor Spielbeginn auf den Weg. Eine Startposition weit weg von jeder anderen Gruppe hilft euch, die eroberten Stationen so lange wie möglich zu behalten.</p><h2>Regeln</h2><ul>  <li>Man darf nur zu Fuss oder ÖV unterwegs sein. <b>Velos sind nicht erlaubt.</b></li>  <li>Auf dem Foto muss immer die <b>ganze Gruppe</b> (ausser der Fotograf) und die Station im Bild sein.</li>  <li>Die Gruppe darf sich nicht trennen.</li>  <li>&#9884; Wir sind Pfadis und verhalten uns auch so. &#9884;</li></ul><br><br><br><br><br><br><br><h2>Wie funktioniert das Spiel?</h2><p>Wer am Ende am meisten Punkte hat, gewinnt. Punkte könnt ihr auf drei Arten machen:</p><ol>  <li>    <b>Stationen erobern</b><br/>    Überall in der Stadt gibt es Stationen die deine Gruppe einnehmen kann. Klickt auf die Station, macht ein Foto eurer ganzen Gruppe und ladet das Foto hoch. Damit gehört die Station euch! Zumindest solange Sie euch kein anderes Team wegschnappt. Alle 5 Minuten bekommt ihr Punkte für jede Station in eurem Besitz.  </li>  <li>    <b>Mister X fangen</b><br/>    In der Stadt ist ein Mister X unterwegs. Ihr seht ihn anhand vom Pio-X Logo auf der Karte. Sobald ihr einen gefangen habt, bekommt ihr einen Passcode, welche euch viele Bonuspunkte bringt. Der Passcode kann in der App eingegeben und damit eingelöst werden. Dem Mister X, den ihr gefangen habt, verschwindet von der Karte. Sind keine mehr sichtbar, habt ihr alle gefangen. (Heute ist es nur einer)  </li>  <li>    <b>Rätsel lösen</b><br/>    Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen seid, könnt ihr die Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien. Rätselserien geben komplett gelöst deutlich mehr Punkte als Einzelrätsel.  </li></ol><h2>Häufige Fragen / Tipps & Tricks</h2><ul>  <li>    Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen.  </li>  <li>    Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird)    <ul>      <li>        <b>Android / Google Handy</b><br/>        In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe Genauigkeit“ gestellt werden. Der Energiesparmodus muss ausgeschaltet sein.<br/>        &#9888; Wenn die App anzeigt, dass GPS nicht gefunden werden kann, wechselt kurz in eine andere App und dann wieder zurück in die Pio-X App.      </li>      <li><b>iPhone / Apple Handy</b><br/>        In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.      </li>    </ul>  </li>  <li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li></ul><h2>&#9888; Hilfe! &#9888; </h2><p>Wenn ihr Probleme irgendwelcher Art habt, meldet euch <b>per Whatsapp oder SMS auf der Notfallnummer</b>. Meldet euch immer per Chat, Anrufe nur bei einem Notfall! Die Notfallnummer lautet 079 542 79 35. Bei <b>medizinischen Notfällen direkt die Ambulanz (144)</b> anrufen und anschliessend die Notfallnummer.</p><p>Notfallnummer: 079 542 79 35</p></ul>'),
	('riddle_radius','100'),
	('show_team_points','1'),
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
	(1,'Mr.X','bisSchen193verordne'),
	(2,'Mr.Y','vermuten220erzaehlend'),
	(3,'Mr.Z','entzerrst892Mittwoch'),
	(4,'Mr.R','vorkommen321mittwochs');

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
	(1,'120121',500,0,1),
	(2,'153566',500,0,1),
	(3,'116129',500,0,1),
	(4,'171831',500,0,1),
	(5,'148332',500,0,1),
	(6,'182101',500,0,1),
	(7,'177598',500,0,1),
	(8,'133466',500,0,1),
	(9,'171185',500,0,1),
	(10,'132942',500,0,1),
	(11,'155099',500,0,1),
	(12,'121936',500,1,1),
	(13,'109240',500,0,1),
	(14,'155391',500,0,1),
	(15,'139058',500,0,1),
	(16,'141966',500,0,1),
	(17,'149671',500,0,1),
	(18,'177495',500,0,1),
	(19,'171115',500,0,1),
	(20,'108952',500,0,1),
	(21,'155357',500,0,2),
	(22,'180827',500,0,2),
	(23,'158610',500,0,2),
	(24,'120081',500,0,2),
	(25,'194237',500,0,2),
	(26,'190331',500,0,2),
	(27,'107794',500,0,2),
	(28,'100537',500,0,2),
	(29,'114770',500,0,2),
	(30,'182084',500,0,2),
	(31,'160040',500,0,2),
	(32,'153968',500,0,2),
	(33,'142747',500,0,2),
	(34,'106027',500,0,2),
	(35,'194214',500,0,2),
	(36,'150484',500,0,2),
	(37,'102423',500,0,2),
	(38,'162594',500,0,2),
	(39,'199543',500,0,2);

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
  `answer_options` longtext,
  `answer_options_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('SINGLE','MULTI') NOT NULL DEFAULT 'SINGLE' COMMENT 'type of riddle',
  `points` int(11) NOT NULL COMMENT 'riddle points',
  `answer_required` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'if text answer is required',
  `image_required` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'if an image is required',
  PRIMARY KEY (`r_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `riddle` WRITE;
/*!40000 ALTER TABLE `riddle` DISABLE KEYS */;

INSERT INTO `riddle` (`r_ID`, `pos_lat`, `pos_long`, `title`, `question`, `dep_ID`, `answer`, `answer_options`, `answer_options_enabled`, `type`, `points`, `answer_required`, `image_required`)
VALUES
	(28,47.49590344785,8.7187109273531,'Ghetto Lovestory (1/4)','Eine Foto-Lovestory in 4 Teilen.\n---\nWie auch schon Romeo und Julia \nsitzen neue Geliebte da\nEine wahre Liebesgeschicht\nVerpasst man am liebsten nicht\nDeshalb sollt ihr mir\nMachen eine Foto-Love-Story hier\nDafür habt ihr an vier Orten Zeit\nAuf das euch die Karte gut geleit',NULL,NULL,NULL,0,'MULTI',200,0,1),
	(29,47.494417410088,8.7161641698934,'Ghetto Lovestory (2/4)','Well mer da im Ghetto sind\nSegis oi jetz ganz gschwind\nEs bizzli Jugenddütsch derf si\nMit dem isch de poste scho verbi',28,'',NULL,0,'MULTI',200,0,1),
	(30,47.49487409934,8.7139969450094,'Ghetto Lovestory (3/4)','Ich hoff es isch nid nur Schnulze pur\nAber au nid Action nur\nDrum lönd oiere Kreativität freie Lauf\nDstory mun guet si dasi si chauf',29,'',NULL,0,'MULTI',200,0,1),
	(31,47.495276417533,8.7121945005514,'Ghetto Lovestory (4/4)','Die Endpose mun de Hammer si\nWell etz ischs denn grad verbi\nMit dem Foti na pünktli sammle\nDas oii Hood da nid mun vergammle',30,'',NULL,0,'MULTI',200,0,1),
	(32,47.499916328951,8.7341524774071,'Logical Teil 1','Hinweise:\n1.	De Graffitti-Artist het nid gern Rüebli\n2.	De Skater staht a erster Position\n3.	De Mafiaboss staht nebed zwei Künstler\n\nFrage: Wie heisst de Rapper?',NULL,'1','[\"Patrick\",\"Yuri Huber\",\"Ruedi\",\"Hans-Jakob Meier\"]',1,'MULTI',250,1,0),
	(34,47.49797919052535,8.723834019326773,'Logical Teil 2','Hinweise:\n4.	De Hans-Jakob Meier isst de Burger nid\n5.	De Patrick Schmid staht rechts nebed de Person wos Rüebli isst.\n6.	E Person am Rand isst es Glace\n7.	De Yuri Huber staht a de 4. Position\n\nFrage:\nWas isst de Graffiti Artist?',NULL,'3','[\"Burger\",\"Glace\",\"R\\u00fcebli\",\"n\\u00fct\"]',1,'MULTI',250,1,0),
	(35,47.50090753339,8.7277393156525,'Logical Teil 3','Hinweise:\n8.	De Skater isst nüt ungsunds\n9.	De Patrick het d’Händ frei\n10.	De Mafia-Boss het keis H im Name\n11.	De Rapper staht rechts vom Ruedi\n\nFrage:\nWer staht Links vom Yuri Huber?',NULL,'0','[\"Mafiaboss\",\"Skater\",\"Graffiti Artist\",\"Rapper\"]',1,'MULTI',250,1,0),
	(36,47.499201006353,8.7181745583053,'Gangster Logik','Finde das Rätsel. Du musst in den Underground gehen um es zu finden. Wenn du es gelöst hast, kannst du hier die Lösung eingeben:',NULL,'2','[\"Die Summe ist 3 oder 4\",\"Die Summe ist 5 oder 6\",\"Die Summe ist 7 oder 8\",\"Die Summe ist 9 oder 10\"]',1,'SINGLE',400,1,0),
	(37,47.500617605737,8.7243275457855,'#piosx19','Bei welchen 2 fehlt etwas? #piosx19',NULL,'1','[\"Fussboden & Champagner\",\"Hand & BMW\",\"Texten & Winterthur\",\"Audi & Essen\"]',1,'SINGLE',400,1,0);

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
	(5,47.494706674598476,8.713542222976685,10,'Diviko WG','Betreutes Wohnen für altgediente Divikonianer',1),
	(12,47.494746,8.717842,10,'Chrafti','Was isch looos?',1),
	(13,47.49552,8.716337,10,'Fabrikk','Schaffä, schaffä, Loki baue',1),
	(17,47.498473895819,8.7321674823761,10,'La Cyma','',1),
	(18,47.498347046788,8.7311053276062,10,'Brunne im Grabe','',1),
	(19,47.498354295313,8.7293189764023,10,'Albani','badum\'tss',1),
	(22,47.499869214927,8.7350749969482,10,'Vögelipark Brunne','Brunne im Lindeguetpark',1),
	(23,47.499659013382,8.7345841526985,10,'Voliere im Vögelipark','Genau drum seit mer em Lindeguetpark ebe anders ...',1),
	(24,47.499945322176,8.7317617982626,10,'Sandwich','Feini grossi Sandwich',1),
	(25,47.500594041387,8.731429874897,10,'Stadthus Brunne','Ideal für Wasserschlachte im Summer!',1),
	(26,47.500945578617,8.7288951873779,10,'Stadtpark Brunne','Brunne im Stadtpark',1),
	(27,47.499664449639,8.7336346507072,10,'Pauseplätzli','Pauseplätzli im Vögelipark',1),
	(32,47.497415603092,8.7221360206604,10,'Salzhaus','Da steppt de Bär',1),
	(33,47.498945046677,8.7238097190857,10,'Metallpilz','Busbahnhof Winterthur',1),
	(34,47.498926925569,8.7296703457832,10,'Strings','Wenn nüme ali Saite hesch',1),
	(35,47.499590154072,8.7311509251595,10,'Springbrunne im Grabe','Spring Brunne, spring!',1),
	(36,47.499755053848,8.7265482544899,10,'Casiontheater','Früehner me Glück, hüt macheds Theater',1),
	(37,47.500333105015,8.7290292978287,10,'Am Öski sind Bilder','Da het de Oskar Reinhart vil gsammled',1),
	(38,47.50092021003,8.7314110994339,10,'Stadthuus','So mit Statue uf em Dach und so ... het de Semper mal plant',1),
	(39,47.500586793172,8.7338760495186,10,'Hässlichi Kunscht','Die wohl hässlichschti Skulptur vo Winti',1),
	(84,47.499796383446,8.7182575464249,10,'Sulzer Hochhus','Das isch recht lang mal s\'höchscht Huus vo de Schweiz gsi.',1),
	(85,47.501303211647,8.7178391218185,10,'Bierkurve FCW','d\'Fankurve vom FC Winterthur',1),
	(88,47.495045239939,8.7188422679901,10,'Skillspark','Gump, Fahr und hoffentlich nid Unfallort',1),
	(89,47.495791879632,8.7188315391541,10,'Portier','Igangslokal zum Lagerplatzareal',1),
	(90,47.494363831341,8.7185311317444,10,'Les Wagons','Esse im alte Üetlibergbähnli',1),
	(91,47.493327203433,8.7160205841064,10,'ZHAW Architektur','Architektur Departement der ZHAW',1),
	(106,47.501118704395,8.7146687507629,10,'Hin und Her','Da wierds eim trümlig bim zueluege',1),
	(107,47.497538622834,8.7191614508629,10,'Superblock','Da drin isch d\'Stadtverwaltig',1),
	(108,47.496241308115,8.7178015708923,10,'Halle 53','Meh als nur es Parkhus',1),
	(116,47.496683483998,8.7140035629272,10,'Brüehlguetpark','De Park mit em chrumme Haag',1),
	(125,47.492779324749,8.7138158082962,10,'Schuelhus Tössfeld','Het es riesigs Umspannwerk under em Sportplatz',1),
	(128,47.495233713096,8.7214547395706,10,'Entlipark','Heisst eigentlich Frohbergpark',1),
	(129,47.495193843831,8.7203818559647,10,'Wylandbrugg','Kein Ahnig warum die so heisst',1),
	(130,47.496701605881,8.7191104888916,10,'ZHAW Bibliothek','Büecher, Büecher und no meh Büecher',1),
	(148,47.501250000708,8.7198615074158,10,'Sankt Peter und Paul','Ding Dong und so',1),
	(199,47.500829607832,8.7304401397705,10,'Altstadt Schulhaus','Alti Stadt, jungi Schüeler',1),
	(202,47.499109948479,8.7327817082405,10,'S\'Chliinschte Hüsli','S\'chlinschte Huus vo Winti',1),
	(203,47.498897931782,8.7338465452194,10,'Schuelhus Geiselweid','Ob da d\'Lehrer sich da mängishc als Geisel fühled?',1),
	(237,47.498053480714,8.7164282798767,10,'Anton-Graff Berufschule','Bruefsschuel',1),
	(246,47.49151486772,8.7142825126648,10,'HaltestelleTössfeld','Feld neb de Töss',1),
	(247,47.493907137652,8.7108278274536,10,'Haltestelle Gaswerk','Gasigi Station',1),
	(260,47.500565048521,8.7190622091293,10,'S24 WG','',1),
	(304,47.50033672914,8.723863363266,10,'Hauptbahnhof Winterthur','',1),
	(305,47.500133777745,8.724582195282,10,'Hauptpost Winterthur','',1),
	(335,47.493783902166,8.7102001905441,10,'Gaswerk','',1),
	(360,47.494558025133,8.7168842554092,10,'Webling','',1),
	(368,47.49843765327,8.7213313579559,10,'Kesselhaus','',1),
	(369,47.499601620182,8.7152749300003,10,'Zupf und weg','',1),
	(376,47.496524011158,8.7121260166168,10,'Brüehlguet','',1),
	(379,47.498386706442,8.7205778175827,10,'Plan B','',1),
	(382,47.501994530675,8.7224875586417,10,'Vegan Store','',1),
	(384,47.501165192818,8.7215375066874,10,'Wartstrasse','',1),
	(385,47.500862852929,8.7200333545497,10,'Hey Paul','',1),
	(386,47.500003138139,8.7226470883934,10,'Bahnhof','',1),
	(387,47.499906104549,8.7166428926205,10,'Halbe schöni Ussicht','',1),
	(388,47.499075789928,8.7150693680317,10,'Schlittle im Winter','',1),
	(389,47.498443097312,8.7264518553253,10,'Neumärt','',1),
	(390,47.497886763447,8.724503230476,10,'Archhöfe','',1),
	(391,47.499640892519,8.7212738508221,10,'Neuwiesen','',1);

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
	(1,'John Kiwi','umgekehrtgoutierenluftdichtes',NULL),
	(2,'Joe Banana','BegeistertKuendigungsschreibensgekauft',NULL),
	(3,'Whack Whack','versprecheGemeinschaftswohlabgeschweiften',NULL),
	(4,'Pistol pete','hinausschiessendesBongoungesalzenster',NULL),
	(5,'Horse Face','tabuvergebenerUntergrunds',NULL),
	(6,'The Owl','VizekoenigSkizzeAussengruppe',NULL),
	(7,'Scarface','zaertlichkeitSenatssprechersanfing',NULL),
	(8,'That Guy','ORFnachempfindendmagischen',NULL),
	(9,'Quiet Godfather','Saisonsgeilstenabgebremst',NULL),
	(10,'Shagro Junior','StkQuartalenleistungsgerechtes',NULL),
	(11,'Chee Chee','WalzblechsSchwaechlingeanmarschierende',NULL),
	(12,'Pat the cat','Osterterminerledigendehundertprozentiger',NULL),
	(13,'Raven','wohlschmeckendereversandtgrossspuriges',NULL),
	(14,'Fäger','ZeitungHochbaukenntnisseSeminarist',NULL);

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
	(1,47.4947734,8.7170921,14,'Püge','2019-05-12 13:30:28'),
	(2,47.4947734,8.7170921,14,'Püge','2019-05-12 13:30:28');

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
	(1,'admin','RoverGO');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
