#!/usr/bin/env bash

#if [ ! -f /www/setup_done ]; then
#    exit 0;
#fi
sleep 10;
mysql -h mysql -u root --password=$PIOX_DBPASS -e "create database $PIOX_DBNAME"
mysql -h mysql -u root --password=$PIOX_DBPASS $PIOX_DBNAME < /www/dbdump.sql

touch /www/setup_done