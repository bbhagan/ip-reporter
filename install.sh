#! /bin/bash

# Prompt user
read -p "Auth key:" AUTH_KEY
read -p "Client ID:" CLIENT_ID
read -p "Command & Control Server Host:" COMMAND_CONTROL_HOST 

# Install node & npm
sudo apt-get install -y nodejs
sudo apt-get install -y npm

#Install the app
npm install

#Make the log directory
if [ -d "/var/log/ip-reporter" ]
then
    echo "Re-ran install" >> /var/log/ip-reporter/ip-reporter.log
else
    sudo mkdir /var/log/ip-reporter/
    sudo chown pi:pi /var/log/ip-reporter/
    echo "New install" >> /var/log/ip-reporter/ip-reporter.log
fi

#Create the executable that agent.sh/crontab will call

echo "#! /bin/bash" > reportIp.sh
echo " " >> reportIp.sh

# Need to sleep so machine has chance to boot
echo "sleep 10" >> reportIp.sh

# Var declarations
echo "IP_ADDRESS=\$(/sbin/ifconfig eth0 | grep inet | awk '{ print \$2}')" >> reportIp.sh
echo "CLIENT_ID=${CLIENT_ID}" >> reportIp.sh
echo "AUTH_KEY=${AUTH_KEY}" >> reportIp.sh
echo "COMMAND_CONTROL_HOST=${COMMAND_CONTROL_HOST}" >> reportIp.sh

echo '/usr/bin/node ~/ip-reporter/index.js authKey=${AUTH_KEY} clientId=${CLIENT_ID} commandControlHost=${COMMAND_CONTROL_HOST} ipAddress=${IP_ADDRESS}' >> reportIp.sh 

echo "Add these lines to agent.sh within the for i in seq 1 24 loop:"
echo "SERVER_IP_ADDRESS=\$(../ip-reporter/reportIp.sh)"
echo "echo \"WPT Server: \${SERVER_IP_ADDRESS}\""
echo "Modify the python wptagent.py line to use the \${SERVER_IP_ADDRESS} variable"

#Change permissions on script 
chmod +x reportIp.sh

echo "Calling reportIp.sh"
./reportIp.sh

echo "Done!"

