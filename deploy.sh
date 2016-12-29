#!/bin/bash

# Config
PROJECT_DIR=/home/dienerli/public_html/pioxapp
CONFIG_FILE=/home/dienerli/_config.piox.php
# HTACCESS_FILE=/home/dienerli/.htaccess_piox

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
    git status
    git pull
    git submodule update --recursive
fi


# Update Source Code
git status
git pull
git submodule update --recursive


# Install Config
# cp $CONFIG_FILE $PROJECT_DIR/api/_conf.php
# cp $HTACCESS_FILE $PROJECT_DIR/.htaccess

# Composer Install
cd $PROJECT_DIR/
cd api
curl -sS https://getcomposer.org/installer | php
php composer.phar install


echo -e "\n ======= Installation Done ========\n"