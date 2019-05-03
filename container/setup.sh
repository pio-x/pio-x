#!/usr/bin/env bash

MAXSLEEP=60
SLEEPCNT=0
DBEXISTS=`mysql -h mysql -u root --password=$PIOX_DBPASS -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$PIOX_DBNAME'"`

res=$?
until [ "$res" -eq 0 ] || [ "$SLEEPCNT" -eq "$MAXSLEEP" ]
do
    sleep 1
    SLEEPCNT=$(($SLEEPCNT+1))
    DBEXISTS=`mysql -h mysql -u root --password=$PIOX_DBPASS -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$PIOX_DBNAME'"`
    res=$?
done

if [[ $DBEXISTS != *"SCHEMA_NAME"* ]]; then
  mysql -h mysql -u root --password=$PIOX_DBPASS -e "create database $PIOX_DBNAME"
  mysql -h mysql -u root --password=$PIOX_DBPASS $PIOX_DBNAME < /www/api/dbdumps/piox_dbdump_default.sql
fi
