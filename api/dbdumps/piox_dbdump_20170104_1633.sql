-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Jan 2017 um 16:33
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
  `x_hash` varchar(255) NOT NULL COMMENT 'mrx hash'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `mrx`
--

INSERT INTO `mrx` (`x_ID`, `name`, `x_hash`) VALUES
(1, 'Mr.X', 'x111'),
(2, 'Mr.Y', 'x222'),
(3, 'Mr.Z', 'x333');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mrx_position`
--

CREATE TABLE `mrx_position` (
  `xpos_ID` int(11) NOT NULL COMMENT 'PK mrx position ID',
  `xpos_lat` double NOT NULL COMMENT 'mrx latitude',
  `xpos_long` double NOT NULL COMMENT 'mrx longitude',
  `mrx_ID` int(11) NOT NULL COMMENT 'FK mrx ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'mrx position timestamp',
  `description` varchar(1000) NOT NULL COMMENT 'mrx position description'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `mrx_position`
--

INSERT INTO `mrx_position` (`xpos_ID`, `xpos_lat`, `xpos_long`, `mrx_ID`, `timestamp`, `description`) VALUES
(1, 47.50310134887695, 8.73583984375, 1, '2016-12-31 16:11:27', 'Zu Fuss unterwegs zum Bus.'),
(2, 47.504798889160156, 8.736860275268555, 1, '2016-12-31 16:11:33', 'Nehme den Bus Nr.10'),
(3, 47.50790023803711, 8.758110046386719, 1, '2016-12-31 16:11:41', 'Nehme den Bus Nr.1'),
(4, 47.498600006103516, 8.748880386352539, 2, '2016-12-31 16:11:48', 'Nehme den Zug'),
(5, 47.48749923706055, 8.76436996459961, 2, '2016-12-31 16:11:55', 'Nehme den Bus Nr.2');

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
  `mrx_ID` int(11) NOT NULL COMMENT 'FK mrx ID'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `passcode`
--

INSERT INTO `passcode` (`p_iD`, `code`, `points`, `used`, `mrx_ID`) VALUES
(1, '18', 20, 0, 0),
(2, '3', 30, 0, 0),
(3, '123abc', 15, 0, 0),
(4, '12', 7, 0, 0),
(5, 'mrx1a', 50, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `riddle`
--

CREATE TABLE `riddle` (
  `r_ID` int(11) NOT NULL COMMENT 'riddle ID',
  `pos_lat` double DEFAULT NULL COMMENT 'riddle latitude',
  `pos_long` double DEFAULT NULL COMMENT 'riddle longitude',
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
(1, 47.499874114990234, 8.732152938842773, 'Wieviele Bänkli gibt es im Vögeli Park? (Lindengutpark)', NULL, '18', 'MULTI', 20),
(2, 47.50304412841797, 8.729138374328613, 'Wieviele Tritte hat die Terrasse vom Münzkabinett?', 1, '3', 'MULTI', 30),
(3, NULL, NULL, 'Mache einen Handstand mit einem Elefanten auf dem Rücken.', NULL, '', 'SINGLE', 7),
(4, 47.505332946777344, 8.727124214172363, 'Wieviele Räder hat das Gefährt?', NULL, '12', 'MULTI', 20);

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
  `state` enum('LOCKED','UNLOCKED','SOLVED','') NOT NULL COMMENT 'riddle state',
  `img_ID` varchar(255) NOT NULL COMMENT 'team img of riddle'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `r_team_riddle`
--

INSERT INTO `r_team_riddle` (`r_ID`, `t_ID`, `state`, `img_ID`) VALUES
(1, 2, 'SOLVED', '0');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `r_team_station`
--

CREATE TABLE `r_team_station` (
  `rts_ID` int(11) NOT NULL,
  `s_ID` int(11) NOT NULL COMMENT 'FK station ID',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'station capture time',
  `img_ID` varchar(255) NOT NULL COMMENT 'team img of station'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `r_team_station`
--

INSERT INTO `r_team_station` (`rts_ID`, `s_ID`, `t_ID`, `timestamp`, `img_ID`) VALUES
(1, 1, 3, '2016-12-31 16:19:25', '1'),
(2, 2, 2, '2016-12-31 16:19:28', '2'),
(3, 3, 3, '2016-12-31 16:19:31', '3'),
(4, 4, 4, '2016-12-31 16:19:34', '4'),
(5, 5, 1, '2016-12-31 16:20:09', '6');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `s_ID` int(11) NOT NULL COMMENT 'PK station ID',
  `pos_lat` double NOT NULL COMMENT 'station latitude',
  `pos_long` double NOT NULL COMMENT 'station longitude',
  `name` varchar(255) NOT NULL COMMENT 'station name',
  `description` varchar(1000) NOT NULL COMMENT 'station description'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`s_ID`, `pos_lat`, `pos_long`, `name`, `description`) VALUES
(1, 47.499027252197266, 8.728534698486328, 'Chileplatz', 'Platz vor Stadtkirche'),
(2, 47.498722076416016, 8.730570793151855, 'Holzmaa', 'Er war mal hier'),
(3, 47.50092315673828, 8.725961685180664, 'Ufos', 'Aliens auf dem Merkurplatz'),
(4, 47.51821517944336, 8.71927261352539, 'Warzenbunker', 'Auch zum Einkaufen geeignet'),
(5, 47.494606018066406, 8.712735176086426, 'Diviko WG', 'Betreutes Wohnen für altgediente Divikonianer');

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
  `team_lat` double NOT NULL COMMENT 'team latitude',
  `team_long` double NOT NULL COMMENT 'team longitude',
  `t_ID` int(11) NOT NULL COMMENT 'FK team ID',
  `player` varchar(255) NOT NULL COMMENT 'player info',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'position timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `teamposition`
--

INSERT INTO `teamposition` (`tp_ID`, `team_lat`, `team_long`, `t_ID`, `player`, `timestamp`) VALUES
(1, 47.48493194580078, 8.761857986450195, 4, 'Hugo', '2016-12-29 14:45:13'),
(2, 47.483360290527344, 8.760130882263184, 4, 'Hugo', '2016-12-29 14:47:13'),
(3, 47.48478698730469, 8.757975578308105, 4, 'Stei', '2016-12-29 14:47:36'),
(4, 47.498043060302734, 8.760632514953613, 3, 'Hund', '2016-12-29 14:48:47');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `u_ID` int(11) NOT NULL COMMENT 'user ID',
  `username` varchar(255) NOT NULL COMMENT 'username',
  `hash` varchar(255) NOT NULL COMMENT 'backend user hash'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`u_ID`, `username`, `hash`) VALUES
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
  ADD PRIMARY KEY (`x_ID`),
  ADD UNIQUE KEY `x_hash` (`x_hash`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `x_hash_2` (`x_hash`);

--
-- Indizes für die Tabelle `mrx_position`
--
ALTER TABLE `mrx_position`
  ADD PRIMARY KEY (`xpos_ID`);

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
  ADD PRIMARY KEY (`rts_ID`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`s_ID`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`t_ID`),
  ADD UNIQUE KEY `hash` (`hash`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `hash` (`hash`);

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
  MODIFY `x_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK mrx ID', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `mrx_position`
--
ALTER TABLE `mrx_position`
  MODIFY `xpos_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PK mrx position ID', AUTO_INCREMENT=6;
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
-- AUTO_INCREMENT für Tabelle `r_team_station`
--
ALTER TABLE `r_team_station`
  MODIFY `rts_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
