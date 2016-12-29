-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Dez 2016 um 15:58
-- Server-Version: 10.1.16-MariaDB
-- PHP-Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `piox`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `log`
--

CREATE TABLE `log` (
  `l_ID` int(11) NOT NULL COMMENT 'log ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'log time',
  `text` varchar(1000) NOT NULL COMMENT 'log text',
  `type` enum('RIDDLE','STATION','MRX','OTHER') NOT NULL COMMENT 'log type',
  `FK_ID` int(11) NOT NULL COMMENT 'FK ID of type'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `log`
--

INSERT INTO `log` (`l_ID`, `timestamp`, `text`, `type`, `FK_ID`) VALUES
(1, '2016-12-29 14:04:11', 'Team 1 hat Mr.X erwischt!', 'MRX', 1),
(2, '2016-12-29 14:04:11', 'Team 2 hat ein Rätsel gelöst', 'RIDDLE', 1),
(3, '2016-12-29 14:04:11', 'Team 3 Hat eine Station eingenommen', 'STATION', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mrx`
--

CREATE TABLE `mrx` (
  `x_ID` int(11) NOT NULL COMMENT 'PK mrx ID',
  `name` varchar(255) NOT NULL COMMENT 'mrx name',
  `pos_lat` float NOT NULL COMMENT 'mrx latitude',
  `pos_long` float NOT NULL COMMENT 'mrx longitude',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'mrx position time',
  `description` varchar(1000) DEFAULT NULL COMMENT 'mrx location description'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `mrx`
--

INSERT INTO `mrx` (`x_ID`, `name`, `pos_lat`, `pos_long`, `timestamp`, `description`) VALUES
(1, 'Mr.X', 47.5031, 8.73584, '2016-12-29 13:54:07', 'Zu Fuss unterwegs zum Bus.'),
(2, 'Mr.X', 47.5048, 8.73686, '2016-12-29 13:54:54', 'Nehme den Bus Nr.10'),
(3, 'Mr.X', 47.5079, 8.75811, '2016-12-29 13:55:53', 'Nehme den Bus Nr.1'),
(4, 'Mr.Y', 47.4986, 8.74888, '2016-12-29 13:56:49', 'Nehme den Zug'),
(5, 'Mr.Y', 47.4875, 8.76437, '2016-12-29 13:57:52', 'Nehme den Bus Nr.2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `notification`
--

CREATE TABLE `notification` (
  `n_ID` int(11) NOT NULL COMMENT 'PK notifications',
  `title` varchar(255) NOT NULL COMMENT 'notification title',
  `text` varchar(1000) NOT NULL COMMENT 'notification text',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'notification time',
  `t_ID` int(11) DEFAULT NULL COMMENT 'team ID if private'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `notification`
--

INSERT INTO `notification` (`n_ID`, `title`, `text`, `timestamp`, `t_ID`) VALUES
(1, 'Achtung, fertig, los!', 'Das Spiel beginnt um 14:00 Uhr!', '2016-12-29 14:02:06', NULL),
(2, 'Mr.X gesichtet!', 'Mister X wurde gesehen', '2016-12-29 14:02:06', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `passcode`
--

CREATE TABLE `passcode` (
  `p_iD` int(11) NOT NULL COMMENT 'passcode ID',
  `code` varchar(255) NOT NULL,
  `points` int(11) NOT NULL COMMENT 'score points',
  `used` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'passcode used',
  `x_name` varchar(255) NOT NULL COMMENT 'FK Mr.X name'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `passcode`
--

INSERT INTO `passcode` (`p_iD`, `code`, `points`, `used`, `x_name`) VALUES
(1, '18', 20, 0, ''),
(2, '3', 30, 0, ''),
(3, '123abc', 15, 0, ''),
(4, '12', 7, 0, ''),
(5, 'mrx1a', 50, 0, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `riddle`
--

CREATE TABLE `riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'riddle ID',
  `pos_lat` float DEFAULT NULL COMMENT 'riddle latitude',
  `pos_long` float DEFAULT NULL COMMENT 'riddle longitude',
  `question` varchar(5000) NOT NULL COMMENT 'riddle question',
  `dep_ID` int(11) DEFAULT NULL COMMENT 'dependency ID',
  `answer` varchar(255) DEFAULT NULL COMMENT 'riddle answer',
  `type` enum('SINGLE','MULTI','','') NOT NULL COMMENT 'type of riddle',
  `points` int(11) NOT NULL COMMENT 'riddle points'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `riddle`
--

INSERT INTO `riddle` (`r_ID`, `pos_lat`, `pos_long`, `question`, `dep_ID`, `answer`, `type`, `points`) VALUES
(1, 47.4999, 8.73215, 'Wieviele Bänkli gibt es im Vögeli Park? (Lindengutpark)', NULL, '18', 'MULTI', 20),
(2, 47.503, 8.72914, 'Wieviele Tritte hat die Terrasse vom Münzkabinett?', 1, '3', 'MULTI', 30),
(3, NULL, NULL, 'Mache einen Handstand mit einem Elefanten auf dem Rücken.', NULL, '', 'SINGLE', 7),
(4, 47.5053, 8.72712, 'Wieviele Räder hat das Gefährt?', NULL, '12', 'MULTI', 20);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `r_team_mrx`
--

CREATE TABLE `r_team_mrx` (
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `x_name` varchar(255) NOT NULL COMMENT 'FK mrx name'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `r_team_mrx`
--

INSERT INTO `r_team_mrx` (`t_ID`, `x_name`) VALUES
(1, 'Mr.X');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `r_team_riddle`
--

CREATE TABLE `r_team_riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'FK riddle ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `state` enum('LOCKED','UNLOCKED','SOLVED','') NOT NULL COMMENT 'riddle state'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `r_team_riddle`
--

INSERT INTO `r_team_riddle` (`r_ID`, `t_ID`, `state`) VALUES
(1, 2, 'SOLVED');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `r_team_station`
--

CREATE TABLE `r_team_station` (
  `s_ID` int(11) NOT NULL COMMENT 'FK station ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'station capture time'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `r_team_station`
--

INSERT INTO `r_team_station` (`s_ID`, `t_ID`, `timestamp`) VALUES
(1, 3, '2016-12-29 14:05:42');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `s_ID` int(11) NOT NULL COMMENT 'PK station ID',
  `pos_lat` float NOT NULL COMMENT 'station latitude',
  `pos_long` float NOT NULL COMMENT 'station longitude',
  `name` varchar(255) NOT NULL COMMENT 'station name',
  `description` varchar(1000) NOT NULL COMMENT 'station description'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`s_ID`, `pos_lat`, `pos_long`, `name`, `description`) VALUES
(1, 47.499, 8.72853, 'Chileplatz', 'Platz vor Stadtkirche'),
(2, 47.4987, 8.73057, 'Holzmaa', 'Er war mal hier'),
(3, 47.5009, 8.72596, 'Ufos', 'Aliens auf dem Merkurplatz'),
(4, 47.5182, 8.71927, 'Warzenbunker', 'Auch zum Einkaufen geeignet'),
(5, 47.4946, 8.71274, 'Diviko WG', 'Betreutes Wohnen für altgediente Divikonianer');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `t_ID` int(11) NOT NULL COMMENT 'team ID',
  `name` varchar(255) NOT NULL COMMENT 'team name',
  `hash` varchar(255) NOT NULL COMMENT 'team hash',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT 'team score',
  `color` varchar(255) NOT NULL COMMENT 'team color'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`t_ID`, `name`, `hash`, `score`, `color`) VALUES
(1, 'team1', '111', 0, 'red'),
(2, 'team2', '222', 0, 'green'),
(3, 'team3', '333', 0, 'blue'),
(4, 'team4', '444', 0, 'yellow');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teamposition`
--

CREATE TABLE `teamposition` (
  `tp_ID` int(11) NOT NULL COMMENT 'PK team position ID',
  `team_lat` float NOT NULL COMMENT 'team latitude',
  `team_long` float NOT NULL COMMENT 'team longitude',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `player` varchar(255) NOT NULL COMMENT 'player info',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'position timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `teamposition`
--

INSERT INTO `teamposition` (`tp_ID`, `team_lat`, `team_long`, `t_ID`, `player`, `timestamp`) VALUES
(1, 47.4849, 8.76186, 4, 'Hugo', '2016-12-29 14:45:13'),
(2, 47.4834, 8.76013, 4, 'Hugo', '2016-12-29 14:47:13'),
(3, 47.4848, 8.75798, 4, 'Stei', '2016-12-29 14:47:36'),
(4, 47.498, 8.76063, 3, 'Hund', '2016-12-29 14:48:47');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `u_ID` int(11) NOT NULL COMMENT 'user ID',
  `username` varchar(255) NOT NULL COMMENT 'username',
  `password` varchar(255) NOT NULL COMMENT 'password'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`u_ID`, `username`, `password`) VALUES
(2, 'admin', 'admin');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`l_ID`);

--
-- Indizes für die Tabelle `mrx`
--
ALTER TABLE `mrx`
  ADD PRIMARY KEY (`x_ID`);

--
-- Indizes für die Tabelle `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`n_ID`);

--
-- Indizes für die Tabelle `passcode`
--
ALTER TABLE `passcode`
  ADD PRIMARY KEY (`p_iD`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indizes für die Tabelle `riddle`
--
ALTER TABLE `riddle`
  ADD PRIMARY KEY (`r_ID`);

--
-- Indizes für die Tabelle `r_team_mrx`
--
ALTER TABLE `r_team_mrx`
  ADD PRIMARY KEY (`t_ID`,`x_name`);

--
-- Indizes für die Tabelle `r_team_riddle`
--
ALTER TABLE `r_team_riddle`
  ADD PRIMARY KEY (`r_ID`,`t_ID`);

--
-- Indizes für die Tabelle `r_team_station`
--
ALTER TABLE `r_team_station`
  ADD PRIMARY KEY (`s_ID`,`t_ID`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`s_ID`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`t_ID`);

--
-- Indizes für die Tabelle `teamposition`
--
ALTER TABLE `teamposition`
  ADD PRIMARY KEY (`tp_ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_ID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `log`
--
ALTER TABLE `log`
  MODIFY `l_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'log ID', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `mrx`
--
ALTER TABLE `mrx`
  MODIFY `x_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK mrx ID', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `notification`
--
ALTER TABLE `notification`
  MODIFY `n_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK notifications', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `passcode`
--
ALTER TABLE `passcode`
  MODIFY `p_iD` int(11) NOT NULL AUTO_INCREMENT COMMENT 'passcode ID', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `riddle`
--
ALTER TABLE `riddle`
  MODIFY `r_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'riddle ID', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `s_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK station ID', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `t_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'team ID', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `teamposition`
--
ALTER TABLE `teamposition`
  MODIFY `tp_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK team position ID', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `u_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'user ID', AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
