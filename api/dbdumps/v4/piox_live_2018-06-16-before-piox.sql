# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27-0ubuntu1)
# Datenbank: piox_live
# Erstellt am: 2018-06-16 08:30:41 +0000
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
	('home_location_lat','47.50264656200804'),
	('home_location_long','8.727520673202548'),
	('home_location_title','Start Pio-X 2018'),
	('info_text','<h3>Spielregeln</h3> \n<h5>Wie funktioniert das Spiel?</h5>\nWer am Ende am meisten Punkte hat, gewinnt. Punkte könnt Ihr auf drei Arten machen:\n<ul>\n	<li><b>Kolonien (Stationen) erobern</b><br/> Überall in der Stadt gibt es Kolonien, die deine Gruppe einnehmen kann. Klickt auf die\n		Kolonie, macht ein Foto <b>von eurer ganzen Gruppe</b> und ladet das Foto hoch. Damit gehört die Kolonie euch!\n		Zumindest solange sie euch kein anderes Team wegschnappt. <b>Alle 5 Minuten</b> bekommt Ihr <b>Punkte für jede Kolonie</b> in\n		eurem Besitz.</b><br/><br/>\n	</li>\n	<li><b>Kolonialherren (Mister X)</b><br/> In der Stadt sind einige Kolonialherren unterwegs. Ihr seht sie anhand vom Pio-X Logo auf der Karte.\n		Sobald Ihr einen gefangen habt, bekommt Ihr einen Passcode, welcher euch <b>viele Bonuspunkte</b> bringt. Ein Kolonialherr hat zudem\n		zudem einen Paparazzi dabei, welcher auf Wunsch ein Foto von eurer Equipe macht.<br/><br/>\n	</li>\n	<li><b>Rätsel lösen</b><br/> Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen seid, könnt ihr die\n		Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien. Rätselserien geben komplett\n		gelöst deutlich mehr Punkte als Einzelrätsel.\n	</li>\n</ul>\n<h5>Regeln</h5>\n<ul>\n	<li>Man darf nur zu Fuss oder mit dem ÖV unterwegs sein. <b>Velos sind nicht erlaubt.</b></li>\n	<li>Auf dem Foto muss immer die <b>ganze Gruppe</b> (ausser der Fotograf) und die Station/Kolonie im Bild sein.</li>\n	<li>Die Gruppe darf sich nicht trennen.</li>\n	<li>Wir sind Pfadis und verhalten uns auch so.</li>\n</ul>\n<h5>Häufige Fragen / Tipps &amp; Tricks</h5>\n<ul>\n	<li>Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht\n		viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen.\n	</li>\n	<li>Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird)\n		<ul>\n			<li><b>Android / Google Handy:</b><br/> In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe\n				Genauigkeit“ gestellt werden. Der Energiesparmodus muss ausgeschaltet sein. Bei Android immer die App\n				verwenden. Falls der Standort nicht sofort angezeigt wird, <b>wechselt auf eine andere App und dann wieder in die Pio-X App</b> zurück.<br/><br/>\n			</li>\n			<li><b>iPhone / Apple Handy:</b><br/> In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.</li>\n		</ul>\n	</li>\n	<li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li>\n</ul> \n<h5>Hilfe!</h5>\n<p>\n	Wenn ihr Probleme irgendwelcher Art habt, meldet euch <b>per Whatsapp oder SMS</b> auf der\n	Notfallnummer. Meldet euch immer per Chat, Anrufe nur bei einem Notfall! Die Notfallnummer lautet 079 542 79 35.<br>\n	<b>Bei medizinischen Notfällen direkt die Ambulanz (144) anrufen</b> und anschliessend die Notfallnummer.<br/> <br>\n	Notfallnummer: 079 542 79 35\n</p>\n<h5>Start & Ende</h5> \n<p>\n	Spielstart: ca. 14:15 Uhr<br> \n	Spielende: 16:30 Uhr<br>\n	Rangverkündigung: 16:45 Uhr<br>\n</p>\n<h5>Chat für Alle</h5> \n<p>\n	Es gibt einen Telegramchat für alle. Wer sich nicht benimmt, fliegt raus. <a href=\"https://t.me/pio_x\">t.me/pio_x</a>\n</p>'),
	('map_center_lat','47.502646562008'),
	('map_center_long','8.7275206732025'),
	('passcode_page_subtitle','Der etwas andere Pio Wettkampf!'),
	('passcode_page_text','<h2>Was muss ich als Erstes tun?</h2>\n<p>\n  Wenn dein Team diesen Zettel erhalten hat, habt ihr bereits den Checkin hinter euch. So geht’s weiter:\n</p>\n<ol>\n  <li>\n    <b>App herunterladen/öffnen:</b>\n    <ol>\n      <li>\n        Android (Google): App im Play Store herunterladen und den Code oben rechts scannen.\n        Sucht im Google Play nach „Pio-X“ oder tippt folgenden Link ein: http://bit.ly/2mUFWPJ\n      </li>\n      <li>\n        iPhone (Apple): Handycode (QR) oben rechts scannen oder mit dem Link einloggen. Fürs iPhone gibt es keine App, es wird direkt im Webbrowser gespielt. (Ab iOS 11 kann der QR Code direkt mit der Kamera gescannt werden. Ältere iPhones verwenden dafür die App „Scanbot“.)\n      </li>\n    </ol>\n  </li>\n  <li>\n    <b>Tutorial:</b> In der App hat es eine erste Station die als Tutorial dient. Klickt diese an und folge den Anweisungen. Dies dient auch als „Technik-Check“ um zu testen ob auf deinem Telefon alles wie gewünscht funktioniert. Falls etwas nicht klappt, melde dich beim Infostand.\n  </li>\n  <li>\n    <b>Teambild:</b> Klickt in der App auf „Rangliste“, dann ganz unten auf „Teambild ändern“ und macht ein Foto eurer Gruppe und ladet das Foto hoch.\n  </li>\n</ol>\n<p>\n  Wenn das geklappt hat, bist du und deine Gruppe startbereit. <b>Lest euch die Regeln durch</b> und besprecht eure Team-Strategie. Es funktioniert etwas nicht? Probiert es nochmals und kommt sonst zum Infostand, wir helfen euch dort weiter. Der Infostand ist beim Checkin.\n</p>\n<h2>Zeitplan</h2>\n<p>\n  Das Spiel beginnt, sobald alle bereit sind, als circa 14:15 Uhr und endet um 16:30 Uhr. Um 16:45 Uhr ist die Rangverkündigung. Nach der Rangverkündigung ist Schluss.</p>\n<p>\n <b>Tipp:</b> Wenn ihr den Checkin gemacht und das Tutorial durchgespielt habt, dann macht euch schon vor Spielbeginn auf den Weg. Eine Startposition weit weg von jeder anderen Gruppe hilft euch, die eroberten Kolonien so lange wie möglich zu behalten.\n</p>\n<h2>Regeln</h2>\n<ul>\n  <li>Man darf nur zu Fuss oder ÖV unterwegs sein. <b>Velos sind nicht erlaubt.</b></li>\n  <li>Auf dem Foto muss immer die <b>ganze Gruppe</b> (ausser der Fotograf) und die Station/Kolonie im Bild sein.</li>\n  <li>Die Gruppe darf sich nicht trennen.</li>\n  <li>&#9884; Wir sind Pfadis und verhalten uns auch so. &#9884;</li>\n</ul>\n\n<br>\n<br>\n<br>\n<br>\n<br>\n<br>\n<br>\n<h2>Wie funktioniert das Spiel?</h2>\n<p>Wer am Ende am meisten Punkte hat, gewinnt. Punkte könnt ihr auf drei Arten machen:</p>\n<ol>\n  <li>\n    <b>Kolonien (Stationen) erobern</b><br/>\n    Überall in der Stadt gibt es Kolonien die deine Gruppe einnehmen kann. Klickt auf die Kolonie, macht ein Foto eurer ganzen Gruppe und ladet das Foto hoch. Damit gehört die Kolonie euch! Zumindest solange Sie euch kein anderes Team wegschnappt. Alle 5 Minuten bekommt ihr Punkte für jede Kolonie in eurem Besitz.\n  </li>\n  <li>\n    <b>Kolonialherren (Mister X) fangen</b><br/>\n    In der Stadt sind Kolonialherren unterwegs. Ihr seht sie anhand vom Pio-X Logo auf der Karte. Sobald ihr einen gefangen habt, bekommt ihr einen Passcode, welche euch viele Bonuspunkte bringt. Der Passcode kann in der App eingegeben und damit eingelöst werden. Jeder Kolonialherr, den ihr gefangen habt, verschwindet von der Karte. Sind keine mehr sichtbar, habt ihr alle gefangen. (Es sind 4 oder 5)\n  </li>\n  <li>\n    <b>Rätsel lösen</b><br/>\n    Auf der Karte gibt es einige Fragezeichen. Wenn ihr bei einem Fragezeichen seid, könnt ihr die Frage freischalten und danach lösen. Es gibt Einzelfragen, aber auch Rätselserien. Rätselserien geben komplett gelöst deutlich mehr Punkte als Einzelrätsel.\n  </li>\n</ol>\n<h2>Häufige Fragen / Tipps & Tricks</h2>\n<ul>\n  <li>\n    Schaltet den Bildschirm vom Handy aus, wenn ihr unterwegs seid und die Karte nicht braucht. Das Spiel braucht viel Akku und ihr wollt nicht nach dem halben Spiel aufgeben müssen.\n  </li>\n  <li>\n    Standortbestimmung einschalten: (Falls der Standort nicht richtig angezeigt wird)\n    <ul>\n      <li>\n        <b>Android / Google Handy</b><br/>\n        In den Einstellungen auf „Standort“. Der Modus muss dort auf „Hohe Genauigkeit“ gestellt werden. Der Energiesparmodus muss ausgeschaltet sein.<br/>\n        &#9888; Wenn die App anzeigt, dass GPS nicht gefunden werden kann, wechselt kurz in eine andere App und dann wieder zurück in die Pio-X App.\n      </li>\n      <li><b>iPhone / Apple Handy</b><br/>\n        In den Einstellungen auf „Datenschutz“ und dort auf „Ortungsdienste“.\n      </li>\n    </ul>\n  </li>\n  <li>Es können mehrere Personen pro Team gleichzeitig eingeloggt sein.</li>\n</ul>\n<h2>&#9888; Hilfe! &#9888; </h2>\n<p>Wenn ihr Probleme irgendwelcher Art habt, meldet euch <b>per Whatsapp oder SMS auf der Notfallnummer</b>. Meldet euch immer per Chat, Anrufe nur bei einem Notfall! Die Notfallnummer lautet 079 542 79 35. Bei <b>medizinischen Notfällen direkt die Ambulanz (144)</b> anrufen und anschliessend die Notfallnummer.</p>\n<p>Notfallnummer: 079 542 79 35</p>\n<h2>Chat für Alle</h2> \n<ul><li>\n	&#9734; Es gibt einen Telegramchat für alle. Wer sich nicht benimmt, fliegt raus. <b>t.me/pio_x</b>\n</li></ul>'),
	('passcode_page_title','Pio – X 2018'),
	('riddle_radius','100'),
	('show_team_points','1'),
	('station_radius','60');

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
	(1,'Mr. X','JahrestaghervorgetreteneVerzichtserklaerung'),
	(2,'Mr. Y','guetigstemkindischeressichtlich'),
	(4,'Mr. Z','griffigerentfesseltenuneigennuetzigste'),
	(5,'Mr. Q','hervorschautAltrentenHuebe'),
	(6,'Mr. P','ueberwaeltigterscherstverbat');

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
	(1,'183659',500,0,1),
	(2,'176960',500,0,1),
	(3,'140175',500,0,1),
	(4,'133875',500,0,1),
	(5,'147605',500,0,1),
	(6,'112451',500,0,1),
	(7,'186617',500,0,1),
	(8,'149464',500,0,1),
	(9,'164107',500,0,1),
	(10,'131091',500,0,1),
	(11,'137631',500,0,1),
	(12,'165670',500,0,1),
	(13,'135253',500,0,1),
	(14,'103968',500,0,1),
	(15,'178100',500,0,1),
	(16,'106224',500,0,1),
	(17,'145028',500,0,1),
	(18,'145976',500,0,1),
	(19,'186769',500,0,1),
	(20,'135918',500,0,1),
	(21,'151665',500,0,1),
	(22,'135344',500,0,1),
	(23,'183082',500,0,1),
	(24,'132725',500,0,1),
	(25,'184715',500,0,1),
	(26,'157184',500,0,1),
	(27,'111735',500,0,1),
	(28,'115509',500,0,1),
	(29,'188043',500,0,1),
	(30,'196555',500,0,1),
	(31,'191887',500,0,1),
	(32,'177396',500,0,1),
	(33,'118476',500,0,2),
	(34,'139791',500,0,2),
	(35,'168523',500,0,2),
	(36,'176625',500,0,2),
	(37,'173503',500,0,2),
	(38,'143135',500,0,2),
	(39,'109933',500,0,2),
	(40,'131056',500,0,2),
	(41,'180052',500,0,2),
	(42,'139785',500,0,2),
	(43,'199777',500,0,2),
	(44,'142788',500,0,2),
	(45,'172361',500,0,2),
	(46,'178362',500,0,2),
	(47,'123060',500,0,2),
	(48,'143563',500,0,2),
	(49,'155992',500,0,2),
	(50,'163661',500,0,2),
	(51,'126419',500,0,2),
	(52,'173675',500,0,2),
	(53,'107358',500,0,2),
	(54,'140837',500,0,2),
	(55,'188512',500,0,2),
	(56,'143036',500,0,2),
	(57,'158290',500,0,2),
	(58,'102946',500,0,2),
	(59,'139782',500,0,2),
	(60,'177014',500,0,2),
	(61,'107598',500,0,2),
	(62,'176787',500,0,2),
	(63,'162937',500,0,2),
	(64,'121889',500,0,2),
	(65,'126171',500,0,2),
	(66,'151049',500,0,2),
	(67,'106582',500,0,3),
	(68,'147838',500,0,3),
	(69,'165987',500,0,3),
	(70,'101421',500,0,3),
	(71,'160371',500,0,3),
	(72,'107590',500,0,3),
	(73,'157256',500,0,3),
	(74,'158221',500,0,3),
	(75,'190483',500,0,3),
	(76,'147853',500,0,3),
	(77,'189544',500,0,3),
	(78,'150825',500,0,3),
	(79,'100880',500,0,3),
	(80,'110581',500,0,3),
	(81,'189699',500,0,3),
	(82,'115831',500,0,3),
	(83,'181271',500,0,3),
	(84,'187427',500,0,3),
	(85,'172677',500,0,3),
	(86,'101563',500,0,3),
	(87,'131149',500,0,3),
	(88,'172838',500,0,3),
	(89,'133144',500,0,3),
	(90,'113219',500,0,3),
	(91,'169143',500,0,3),
	(92,'104332',500,0,3),
	(93,'111614',500,0,3),
	(94,'131998',500,0,3),
	(95,'169915',500,0,3),
	(96,'110154',500,0,3),
	(97,'156792',500,0,3),
	(98,'125578',500,0,3),
	(99,'177247',500,0,3),
	(100,'186580',500,0,3),
	(101,'183392',500,0,4),
	(102,'135708',500,0,4),
	(103,'198894',500,0,4),
	(104,'193012',500,0,4),
	(105,'178707',500,0,4),
	(106,'177785',500,0,4),
	(107,'184552',500,0,4),
	(108,'117716',500,0,4),
	(109,'148534',500,0,4),
	(110,'141540',500,0,4),
	(111,'131109',500,0,4),
	(112,'123766',500,0,4),
	(113,'143621',500,0,4),
	(114,'181173',500,0,4),
	(115,'163067',500,0,4),
	(116,'142274',500,0,4),
	(117,'121161',500,0,4),
	(118,'136049',500,0,4),
	(119,'168683',500,0,4),
	(120,'191342',500,0,4),
	(121,'160565',500,0,4),
	(122,'104900',500,0,4),
	(123,'150455',500,0,4),
	(124,'141411',500,0,4),
	(125,'173809',500,0,4),
	(126,'115513',500,0,4),
	(127,'198054',500,0,4),
	(128,'134306',500,0,4),
	(129,'167679',500,0,4),
	(130,'104738',500,0,4),
	(131,'176079',500,0,4),
	(132,'154751',500,0,4),
	(133,'121657',500,0,4),
	(134,'165516',500,0,4),
	(135,'146559',500,0,4),
	(136,'153714',500,0,4),
	(137,'169573',500,0,4),
	(138,'147889',500,0,4),
	(139,'111899',500,0,4),
	(140,'114412',500,0,4),
	(141,'184537',500,0,5),
	(142,'159236',500,0,5),
	(143,'157413',500,0,5),
	(144,'182730',500,0,5),
	(145,'180758',500,0,5),
	(146,'198676',500,0,5),
	(147,'152199',500,0,5),
	(148,'103660',500,0,5),
	(149,'168195',500,0,5),
	(150,'128921',500,0,5),
	(151,'141398',500,0,5),
	(152,'195373',500,0,5),
	(153,'195678',500,0,5),
	(154,'121904',500,0,5),
	(155,'174567',500,0,5),
	(156,'131093',500,0,5),
	(157,'116641',500,0,5),
	(158,'188856',500,0,5),
	(159,'146992',500,0,5),
	(160,'187425',500,0,5),
	(161,'119752',500,0,5),
	(162,'176737',500,0,5),
	(163,'155243',500,0,5),
	(164,'169538',500,0,5),
	(165,'191756',500,0,5),
	(166,'125184',500,0,5),
	(167,'186229',500,0,5),
	(168,'174590',500,0,5),
	(169,'132345',500,0,5),
	(170,'121310',500,0,5),
	(171,'120399',500,0,5),
	(172,'129499',500,0,5),
	(173,'137042',500,0,5),
	(174,'158397',500,0,5),
	(175,'182859',500,0,5),
	(176,'138761',500,0,5),
	(177,'116499',500,0,5),
	(178,'153025',500,0,5),
	(179,'150001',500,0,5),
	(180,'198646',500,0,5),
	(181,'131966',500,0,6),
	(182,'125395',500,0,6),
	(183,'189083',500,0,6),
	(184,'151320',500,0,6),
	(185,'127194',500,0,6),
	(186,'155130',500,0,6),
	(187,'132846',500,0,6),
	(188,'122636',500,0,6),
	(189,'193647',500,0,6),
	(190,'104889',500,0,6),
	(191,'179789',500,0,6),
	(192,'190217',500,0,6),
	(193,'161520',500,0,6),
	(194,'129452',500,0,6),
	(195,'137815',500,0,6),
	(196,'170718',500,0,6),
	(197,'172692',500,0,6),
	(198,'134924',500,0,6),
	(199,'188251',500,0,6),
	(200,'183556',500,0,6),
	(201,'176535',500,0,6),
	(202,'153858',500,0,6),
	(203,'116167',500,0,6),
	(204,'183055',500,0,6),
	(205,'106812',500,0,6),
	(206,'117243',500,0,6),
	(207,'151718',500,0,6),
	(208,'192897',500,0,6),
	(209,'109984',500,0,6),
	(210,'161916',500,0,6),
	(211,'168358',500,0,6),
	(212,'120504',500,0,6),
	(213,'105371',500,0,6),
	(214,'101430',500,0,6),
	(215,'155805',500,0,6),
	(216,'172705',500,0,6),
	(217,'190129',500,0,6),
	(218,'185616',500,0,6),
	(219,'123647',500,0,6),
	(220,'102717',500,0,6),
	(221,'165135',500,0,1),
	(222,'179354',500,0,1),
	(223,'125006',500,0,1),
	(224,'142345',500,0,1),
	(225,'148131',500,0,1),
	(226,'199907',500,0,1),
	(227,'115604',500,0,1),
	(228,'103747',500,0,1),
	(229,'174732',500,0,1),
	(230,'160751',500,0,1),
	(231,'169794',500,0,1),
	(232,'141290',500,0,1),
	(233,'118847',500,0,1),
	(234,'195935',500,0,1),
	(235,'128925',500,0,1),
	(236,'172290',500,0,1),
	(237,'112831',500,0,1),
	(238,'175616',500,0,1),
	(239,'111283',500,0,1),
	(240,'134737',500,0,1),
	(241,'176906',500,0,2),
	(242,'140074',500,0,2),
	(243,'143806',500,0,2),
	(244,'115853',500,0,2),
	(245,'168842',500,0,2),
	(246,'139014',500,0,2),
	(247,'131961',500,0,2),
	(248,'159373',500,0,2),
	(249,'170937',500,0,2),
	(250,'193851',500,0,2),
	(251,'140596',500,0,2),
	(252,'142508',500,0,2),
	(253,'186568',500,0,2),
	(254,'139057',500,0,2),
	(255,'145018',500,0,2),
	(256,'139356',500,0,2),
	(257,'173827',500,0,2),
	(258,'139383',500,0,2),
	(259,'181738',500,0,2),
	(260,'122497',500,0,2),
	(261,'197906',500,0,3),
	(262,'188893',500,0,3),
	(263,'163214',500,0,3),
	(264,'124096',500,0,3),
	(265,'136230',500,0,3),
	(266,'187985',500,0,3),
	(267,'123388',500,0,3),
	(268,'140022',500,0,3),
	(269,'196748',500,0,3),
	(270,'146735',500,0,3),
	(271,'101501',500,0,3),
	(272,'135914',500,0,3),
	(273,'126979',500,0,3),
	(274,'121456',500,0,3),
	(275,'157387',500,0,3),
	(276,'197216',500,0,3),
	(277,'134386',500,0,3),
	(278,'155197',500,0,3),
	(279,'129594',500,0,3),
	(280,'157636',500,0,3),
	(281,'194475',500,0,4),
	(282,'164955',500,0,4),
	(283,'160086',500,0,4),
	(284,'166688',500,0,4),
	(285,'119302',500,0,4),
	(286,'171154',500,0,4),
	(287,'128256',500,0,4),
	(288,'189521',500,0,4),
	(289,'135785',500,0,4),
	(290,'161072',500,0,4),
	(291,'159218',500,0,4),
	(292,'196186',500,0,4),
	(293,'156208',500,0,4),
	(294,'140399',500,0,4),
	(295,'173948',500,0,4),
	(296,'158828',500,0,4),
	(297,'190306',500,0,5),
	(298,'174664',500,0,5),
	(299,'160835',500,0,5),
	(300,'120559',500,0,5),
	(301,'108888',500,0,5),
	(302,'171846',500,0,5),
	(303,'174852',500,0,5),
	(304,'123126',500,0,5),
	(305,'137244',500,0,5),
	(307,'122529',500,0,5),
	(308,'191448',500,0,5),
	(309,'151127',500,0,5),
	(310,'144234',500,0,5),
	(311,'149061',500,0,5),
	(312,'163488',500,0,5),
	(313,'198484',500,0,5),
	(314,'114219',500,0,5),
	(315,'189076',500,0,5),
	(316,'176438',500,0,6),
	(317,'152771',500,0,6),
	(318,'192661',500,0,6),
	(319,'166732',500,0,6),
	(320,'196489',500,0,6),
	(321,'135648',500,0,6),
	(322,'144839',500,0,6),
	(323,'101753',500,0,6),
	(324,'176626',500,0,6),
	(325,'113111',500,0,6),
	(326,'108643',500,0,6),
	(327,'174460',500,0,6),
	(328,'160100',500,0,6),
	(329,'189912',500,0,6),
	(330,'114495',500,0,6);

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
	(1,47.502306206942,8.739446775358,'Tierischi Underfüehrig','Was für Tiere (Mehrzahl) sieht man hier? Fische? Giraffen? Löwen?',NULL,'Fische','MULTI',30,1,0),
	(6,47.499781739039,8.7342986153832,'Haustiere der Kolonialherren','Kolonialherren besitzen grosse Grundstücke und halten dort auch gerne Tiere. Welche Tiere (Mehrzahl) werden hier gehalten? Hunde? Affen? Vögel?',1,'Vögel','MULTI',100,1,0),
	(7,47.497322686617,8.7286223905554,'Alles ist relativ!','Welcher berühmte Physiker hat hier unterrichtet? Albert Einstein? Isaac Newton? Stephan Hawking?',NULL,'Albert Einstein','SINGLE',50,1,0),
	(8,47.499127573478,8.7292017477026,'Tierbankfoto','Macht ein Foto von eurer Equipe auf der Bank mit den Tieren.',0,'','SINGLE',50,0,1),
	(9,47.497672433596,8.7266990790537,'ZHAW?','Welches Departemenet der ZHAW ist hier zu Hause? Architektur? Wirtschaft? Gesundheit?',0,'Gesundheit','MULTI',50,1,0),
	(10,47.497342620445,8.7295797715357,'ZHAW 2','Welches Departement ist hier zu Hause? Technik? Architektur? Psychologie?',9,'Technik','MULTI',100,1,0),
	(11,47.502253360268,8.7268546471765,'ZHAW 3','Welches Departement ist hier zu Hause? Technik? Architektur? Wirtschaft?',10,'Wirtschaft','MULTI',100,1,0),
	(12,47.493402069461,8.7161275500248,'ZHAW 4','Welches Departement ist hier zu Hause? Technik? Architektur? Psychologie?',11,'Architektur','MULTI',200,1,0),
	(13,47.500730506755,8.7316105185953,'Fotosession','Inszeniert ein cooles Gruppenfoto. Coole Bilder erhalten Zusatzpunkte!',0,'','SINGLE',50,0,1),
	(14,47.497905446465,8.7292530434318,'Foto mit Hasan!','Macht ein Gruppenfoto mit Hasan, wenn er nicht da ist, kommt später wieder!',0,'','SINGLE',100,0,1),
	(15,47.496057024565,8.7388845207281,'Paparazzi','Macht ein Gruppenfoto mit dem Paparazzi, welcher mit einem der Kolonialherren (Mister X) unterwegs ist.',0,'','SINGLE',200,0,1),
	(16,47.503740233756,8.7266321899481,'Unfall','Was ist hier Gestern entgleist? Auto? Zug? Flugzeug?',0,'','SINGLE',50,1,0),
	(17,47.510074411456,8.7309237243719,'Spital?','Was isch das für en Spital? Tierspital? Privatspital?',0,'Privatspital','SINGLE',50,1,0);

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
	(181,47.519483113488,8.7131989002228,10,'Pfadiheim Schützeweiher','Euses neuschte Heim in Winti',1),
	(182,47.519079493746,8.7165033817291,10,'Schützeweiher','Chan mer leider nid so guet bade',1),
	(183,47.5200119546,8.7175709009171,10,'Minigolf Schützeweiher','Eine vo drü Minigolf Alage in Winti',1),
	(184,47.519617453953,8.716481924057,10,'Camping Winterthur','Da chan mer au im Winter zu Gast si',1),
	(185,47.484134390824,8.7224364280701,10,'Waldkunst','Kunst am Weg zum Bruederhus',1),
	(186,47.482307236407,8.7607678771019,10,'Bibliothek Seen','Viel zum läse',1),
	(187,47.481393635367,8.761864900589,10,'Ref. Kirche Seen','Reformierti Chile Seen',1),
	(189,47.477311239796,8.7725615501404,10,'Endstation Oberseen','Die lethschti Station vom 3er',1),
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
	(362,47.499376103921,8.7080866098404,10,'Buurehof','',1),
	(364,47.508533078996,8.6912812292576,10,'Pögida','',1),
	(365,47.503779535045,8.7213206291199,10,'Tellstrasse','',1),
	(366,47.507039269896,8.7233282625675,10,'Die Löwen','',1),
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
	(381,47.506323442348,8.7322211265564,10,'Schwöschtere Huus','',1),
	(382,47.508200491481,8.7299680709839,10,'Altes Brauereiareal','',1),
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
	(515,47.512936299723,8.7606820464134,10,'Im Mooshof','',1),
	(517,47.486476245817,8.7049606131782,10,'Stauwehr','Manchmal kann man hier baden',1);

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
	(1,'Schweiz','DreharbeitenabgeblendetLeichtsinn',NULL),
	(2,'Deutschland','ueberlassenUntergestelletiefblickender',NULL),
	(3,'Frankreich','schimmernDuerregebietegib',NULL),
	(4,'Italien','emsigstemwiegteabstrakt',NULL),
	(5,'Liechtenstein','bitteremableckendeEigenproduktion',NULL),
	(6,'Österreich','deutscheDrohungenAtomzeitalters',NULL),
	(7,'Belgien','BrummbaerbeschwichtigstSoli',NULL),
	(8,'England','Gepflogenheitverbleibstschnellebiges',NULL),
	(9,'Holland','unehrerbietigesueberwucherterueberstrahlend',NULL),
	(10,'Luxemburg','Behandlungenverabsaeumtetverstehende',NULL),
	(11,'Spanien','hardwaremaesSigallmaechtigemausgewichener',NULL),
	(12,'Portugal','finsterstegestupsteswitzigeres',NULL),
	(13,'Ungarn','EhegattinnenAustragunsstaetteabgespanntere',NULL),
	(14,'Tschechien','FussstuetzenForthzeileReiseziele',NULL),
	(15,'Polen','Annaehrungverwundetemgemessenen',NULL),
	(16,'Rumänien','bremsteabgehauenepartnerschaftlich-kooperativen',NULL),
	(17,'Slowenien','stibitzenzerschnittenemstoepseltet',NULL),
	(18,'Russland','sparenstandrechtlichemFausthandschuhen',NULL),
	(19,'Griechenland','ZaubertrankesWegspeichernUnterrichtsprogramms',NULL),
	(20,'Kroatien','vertieftestverzeichnetestnoetigster',NULL),
	(21,'Finnland','Lueftchengrausameumschichtenden',NULL),
	(22,'Schweden','SoftwareerarbeitungszeitGruenanlagenFeuer',NULL),
	(23,'Dänemark','MagnetventilsteuerungZwischenbemerkungWuertemberg',NULL),
	(24,'Norwegen','konzentriereueberfluessigereswoertlichere',NULL),
	(25,'Estland','FreistellungenFreundinnenknallharten',NULL),
	(26,'Lettland','HeilsamschnuerendEndspurt',NULL),
	(27,'Georgien','umgehalsteremporgestrebtesfuchsrotem',NULL),
	(28,'Japan','uebernachtendeumgebauteranlaeuft',NULL),
	(29,'China','ungeschlachterefortgepflanzteexponiertesten',NULL),
	(30,'Irland','DirektverbindungausholendeGestaltungsmoeglichkeit',NULL),
	(31,'Island','RealisationDateienEinkaeufe',NULL),
	(32,'Kanada','gefiltertezurueckhaengendelistigstes',NULL),
	(33,'Ägypten','unterbrochenemNaphthalinkuegelchenBauplaene',NULL),
	(34,'Marokko','Einsatzbereichbelehreschmecken',NULL),
	(35,'Bulgarien','unerwartetesunterhaltsamsterangeschludigtem',NULL),
	(36,'Andorra','MischerteilDiplumherziehen',NULL),
	(37,'Vatikan','Flussbrueckerivalisierenderlaestige',NULL),
	(38,'Litauen','zusammenzufuegenwuchtigenweiterfuehrende',NULL),
	(39,'Malta','stagniertenvergnuegterZeus',NULL),
	(40,'Monaco','VerhaltensforscherDiplomenInnenseite',NULL),
	(41,'San Marino','aussterbendesannoncierenSchlangenbisses',NULL),
	(42,'Färöer','bemuehenderSchreibzeugsKanzlerwahl',NULL),
	(43,'Gibraltar','fruehestensGesamtkonzeptesHass',NULL),
	(44,'Isle of Man','schuechternstenklirrteueberblendetes',NULL),
	(45,'Australien','hinausbegleitetenverschlechterndesdurchscheint',NULL),
	(46,'Neuseeland','Amtsinhaberblutstillendesrosigem',NULL),
	(47,'Zypern','Abendnachrichtengrenzenlosesterausgenuetztes',NULL),
	(48,'Grönland','Naturrechtnichtsahnenderwillenloserer',NULL),
	(49,'Korea','Entwaesserungreproduzierbareueberwerfende',NULL),
	(50,'Vietnam','erschreckenAnbeterexekutierte',NULL);

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
	(1,47.4947181,8.7169127,3,'asd','2018-06-16 10:28:48'),
	(2,47.4947181,8.7169127,3,'asd','2018-06-16 10:28:48'),
	(3,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:03'),
	(4,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:03'),
	(5,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:18'),
	(6,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:18'),
	(7,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:21'),
	(8,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:29'),
	(9,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:32'),
	(10,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:32'),
	(11,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:33'),
	(12,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:33'),
	(13,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:48'),
	(14,47.4947181,8.7169127,3,'asd','2018-06-16 10:29:48'),
	(15,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:03'),
	(16,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:03'),
	(17,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:18'),
	(18,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:18'),
	(19,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:21'),
	(20,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:29'),
	(21,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:32'),
	(22,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:32'),
	(23,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:33'),
	(24,47.4947181,8.7169127,3,'asd','2018-06-16 10:30:33');

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
	(2,'admin','sansibar13eulach');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
