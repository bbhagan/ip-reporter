#! /bin/bash

# Prompt user
read -p "Auth key:" AUTH_KEY
read -p "Client ID:" CLIENT_ID
read -p "Command & Control Server Host:" COMMAND_CONTROL_HOST 

# Install node & npm
#sudo apt-get install -y nodejs
#sudo apt-get install -y npm

#Install the app
#npm install

#remove .env file if it exists (to be created later)
#if [ -f ".env" ]
#then
#    rm .env
#fi

#Populate .env
#echo "SERVER_POST_URL = http://${COMMAND_CONTROL_HOST}:8000/api/reportIP" > .env
#echo "AUTH_KEY = ${AUTH_KEY}" >> .env
#echo "CLIENT_ID = ${CLIENT_ID}" >> .env
#echo "LOGS_PATH = /home/pi/ip-reporter/logs" >> .env

#Create the executable that agent.sh/crontab will call

echo "#! /bin/bash" > reportIp.sh
echo " " >> reportIp.sh

# Define a timestamp function
echo "timestamp() {" >> reportIp.sh
echo "date +\"%T\"" >> reportIp.sh
echo "}" >> reportIp.sh

#Pause to get everything up & running
echo "sleep 10" >> reportIp.sh

#Go get the IP Address
echo "IP_ADDRESS=\$(hostname -I)" >> reportIp.sh

# Output timestamp to log
#echo "timestamp | " >> reportIp.sh

#Script to post the client IP to the server
echo "curl --data '{\"client\": ${CLIENT_ID}, \"IP\": \"\${IP_ADDRESS}\"}' -H 'Authorization: ${AUTH_KEY}' -H 'Content-type: application/json' --silent --output ./logs/logs.txt http://${COMMAND_CONTROL_HOST}:8000/api/reportIP" >> reportIp.sh

#Create curl script to get WPT server IP
echo "curl -H 'Authorization: ${AUTH_KEY}' http://${COMMAND_CONTROL_HOST}:8000/api/getServerIPCurl" >> reportIp.sh

#Change permissions on script 
chmod +x reportIp.sh

