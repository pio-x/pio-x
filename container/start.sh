#!/usr/bin/env bash

/www/setup.sh

sed -i "s/env\[PIOX_DBNAME\]=.*\$/env\[PIOX_DBNAME\]=$PIOX_DBNAME/" /etc/php/7.0/fpm/pool.d/www.conf
sed -i "s/env\[PIOX_DBUSER\]=.*\$/env\[PIOX_DBUSER\]=$PIOX_DBUSER/" /etc/php/7.0/fpm/pool.d/www.conf
sed -i "s/env\[PIOX_DBPASS\]=.*\$/env\[PIOX_DBPASS\]=$PIOX_DBPASS/" /etc/php/7.0/fpm/pool.d/www.conf
sed -i "s/env\[PIOX_DBHOST\]=.*\$/env\[PIOX_DBHOST\]=$PIOX_DBHOST/" /etc/php/7.0/fpm/pool.d/www.conf

service php7.0-fpm start
nginx -g 'daemon off;'
