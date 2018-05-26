
/* add new img_ID field */
ALTER TABLE log ADD img_ID varchar(255) NOT NULL DEFAULT '' COMMENT 'image filename';
