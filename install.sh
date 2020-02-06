#! /bin/bash

read -p "Auth key:" AUTH_KEY

sudo apt-get install -y node
sudo apt-get install -y npm

echo "SERVER_POST_URL = http://10.10.0.162:8000/api/reportIP" > .env
echo "AUTH_KEY = ${AUTH_KEY}" >> .env