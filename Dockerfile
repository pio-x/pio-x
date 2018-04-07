FROM nginx:1.12

#install chrome
RUN apt-get update -qqy \
  && apt-get -qqy install \
  && apt-get -qqy install php7.0-fpm php7.0-mysql mysql-client  \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN echo "env[PIOX_DBNAME]=\$PIOX_DBNAME \n\
env[PIOX_DBUSER]=\$PIOX_DBUSER \n\
env[PIOX_DBPASS]=\$PIOX_DBPASS \n\
env[PIOX_DBHOST]=\$PIOX_DBHOST \n\
clear_env = no\n\
catch_workers_output = yes\n" >> /etc/php/7.0/fpm/pool.d/www.conf

EXPOSE 80 81

ADD container/setup.sh /www/setup.sh
ADD container/start.sh /www/start.sh

ENTRYPOINT ["/www/start.sh"]
