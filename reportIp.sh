#! /bin/bash
IP_ADDRESS=$(hostname -I)
echo "IP Address: ${IP_ADDRESS}"
node index.js ipAddress=${IP_ADDRESS}