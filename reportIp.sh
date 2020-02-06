#! /bin/bash
IP_ADDRESS=$(hostname -I)
IP_REPORTER_PATH=$(pwd)
echo "IP Address: ${IP_ADDRESS}"
node ${IP_REPORTER_PATH}index.js ipAddress=${IP_ADDRESS}