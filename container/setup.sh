#!/usr/bin/env bash

#if [ ! -f /www/setup_done ]; then
#    exit 0;
#fi

mysql -h mysql -u root --password=mysecretpioXdbpassword -e 'create database piox'
mysql -h mysql -u root --password=mysecretpioXdbpassword piox < /www/dbdump.sql

touch /www/setup_done