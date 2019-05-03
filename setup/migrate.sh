#!/usr/bin/env bash

cd /www/

api/vendor/bin/doctrine-migrations migrate
