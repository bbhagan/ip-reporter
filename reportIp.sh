#! /bin/bash
sleep 10
IP_ADDRESS=$(hostname -I)
curl --data '{"client": 55, "IP": "${IP_ADDRESS}"}' -H 'Authorization: 8675309' -H 'Content-type: application/json' http://10.10.0.10:8000/api/reportIP
echo "curl -H 'Authorization: 8675309' http://10.10.0.10:8000/api/getServerIPCurl"
