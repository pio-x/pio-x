FROM nginx:1.12

#install chrome
RUN apt-get update -qqy \
  && apt-get -qqy install \
  && apt-get -qqy install php7.0-fpm php7.0-mysql mysql-client  \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

EXPOSE 80 81

ADD container/setup.sh /www/setup.sh
ADD container/start.sh /www/start.sh

ENTRYPOINT ["/www/start.sh"]
