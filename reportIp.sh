#! /bin/bash

#Pause to get everything up & running
sleep 10

#Go get the IP Address
IP_ADDRESS=$(hostname -I)

echo "IP Address: ${IP_ADDRESS}"

#Execute and pass in IP Address
node /home/pi/ip-reporter/index.js ipAddress=${IP_ADDRESS}