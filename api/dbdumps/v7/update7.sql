/* add type 'PROFILE' */
ALTER TABLE `log` CHANGE `type` `type` ENUM('RIDDLE','STATION','MRX','PROFILE','OTHER')  CHARACTER SET utf8mb4  COLLATE utf8mb4_general_ci  NOT NULL  DEFAULT 'OTHER'  COMMENT 'log type';
