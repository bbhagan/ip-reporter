#! /bin/bash

# Prompt user
read -p "Auth key:" AUTH_KEY
read -p "Client ID:" CLIENT_ID

# Install node & npm
sudo apt-get install -y nodejs
sudo apt-get install -y npm

#Install the app
npm install

#remove .env file if it exists (to be created later)
if [ -f ".env" ]
then
    rm .env
fi

#Populate .env
echo "SERVER_POST_URL = http://10.10.0.162:8000/api/reportIP" > .env
echo "AUTH_KEY = ${AUTH_KEY}" >> .env
echo "CLIENT_ID = ${CLIENT_ID}" >> .env

echo "Created .env"

echo "Reporting IP"
./reportIp.sh ipAddress=10.10.0.256