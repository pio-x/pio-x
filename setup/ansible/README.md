#Pio-X Ansible Config

## Config (run locally)

copy the example config:

    cp config.yml.example config.yml
    cp inventory.yml.example inventory.yml

and fill in the values that fit your environment

## Install the software (run locally)

configure and install software on your server:

    ansible-playbook -i inventory.yml piox.yml

## Checkout the Sourcecode (on server)

    cd /var/www
    git clone git://github.com/pio-x/pio-x.git piox

## Configure

    cd /var/www/piox

Konfigurationsfiles anlegen und anpassen: cp api/conf.local.php api/conf.php

    php composer.phar install --no-dev -o

DB anlegen und einspielen