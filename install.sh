#! /bin/bash

read -p "Auth key:" AUTH_KEY

sudo apt-get install -y node
sudo apt-get install -y npm

echo "AUTH_KEY = ${AUTH_KEY}" >> .env