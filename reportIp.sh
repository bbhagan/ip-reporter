#! /bin/bash
IP_ADDRESS=$(hostname -I)
IP_REPORTER_PATH=$(pwd)
echo "IP Address: ${IP_ADDRESS}"
node /home/pi/ip-reporter/index.js ipAddress=${IP_ADDRESS} dotenv_config_path=/home/pi/ip-reporter/.env