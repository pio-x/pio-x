FROM nginx:1.16

RUN apt-get update -qqy \
    && apt-get install -qqy --no-install-recommends git unzip curl apt-transport-https lsb-release ca-certificates \
    && curl -Lo /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    && sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list' \
    && apt-get update -qqy \
    && apt-get -qqy install php7.3-fpm php7.3-mysql php7.3-gd php7.3-curl php7.3-mbstring mysql-client  \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get autoclean \
    && apt-get autoremove -y

RUN echo "env[PIOX_DBNAME]=\$PIOX_DBNAME \n\
env[PIOX_DBUSER]=\$PIOX_DBUSER \n\
env[PIOX_DBPASS]=\$PIOX_DBPASS \n\
env[PIOX_DBHOST]=\$PIOX_DBHOST \n\
clear_env = no\n\
catch_workers_output = yes\n" >> /etc/php/7.3/fpm/pool.d/www.conf

COPY ./ /www

EXPOSE 8080 8081 8082

ADD container/setup.sh /www/setup.sh
ADD container/start.sh /www/start.sh

ENTRYPOINT ["/www/container/start.sh"]
