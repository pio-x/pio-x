#Pio-X Ansible Config

## Config (local)

Copy the example config

cp config.yml.example config.yml

cp inventory.yml.example inventory.yml

and fill in the values that fit your environment

## Install the software (local)

$ ansible-playbook -i inventory.yml piox.yml

## Checkout the Sourcecode (on server)

cd /var/www
git clone git://github.com/pio-x/pio-x.git piox



