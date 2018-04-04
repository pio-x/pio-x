#!/usr/bin/env bash

/www/setup.sh

service php7.0-fpm start
nginx -g 'daemon off;'