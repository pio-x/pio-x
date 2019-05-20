#!/bin/bash

# Config
PROJECT_DIR=/var/www/piox/
CONFIG_FILE=/var/piox/_config.piox.php

echo -e "Working with Directory $PROJECT_DIR\n"

# Check if directory exists and is a git repository
if [ ! -d "$PROJECT_DIR/.git" ]; then
    # Clone fresh repo if not yet a git repository
    rm -rf $PROJECT_DIR
    mkdir $PROJECT_DIR
    cd $PROJECT_DIR
    git clone --recursive https://github.com/pio-x/pio-x.git .
else
    # Update Source Code
    cd $PROJECT_DIR
    git reset --hard
    git status
    git pull
    git submodule update --recursive
fi

# Install Config
cp $CONFIG_FILE $PROJECT_DIR/api/conf.php

# Composer Install
cd $PROJECT_DIR/
cd api
export HOME=$PROJECT_DIR/api
curl -sS https://getcomposer.org/installer | php
php composer.phar install

echo -e "\n HEAD is now at: \n"
git log -1

# Run DB migrations
vendor/bin/doctrine-migrations migrate -n

echo -e "\n ======= Installation Done ========\n"
