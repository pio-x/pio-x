# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26-0ubuntu0.18.04.1)
# Datenbank: piox
# Erstellt am: 2019-05-25 11:20:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
	(1,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(2,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(3,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(4,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(5,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(6,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(7,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(8,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(9,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(10,47.4971878,8.7221107,20,'Gimmlin','2019-05-25 13:20:13'),
	(11,47.497432140919,8.7224673106379,27,'zora','2019-05-25 13:20:26'),
	(12,47.497432140919,8.7224673106379,27,'zora','2019-05-25 13:20:26');

/*!40000 ALTER TABLE `teamposition` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
