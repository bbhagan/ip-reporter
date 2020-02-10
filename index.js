const fetch = require("node-fetch");
const fs = require("fs");
const os = require("os");
const moment = require("moment");
require("dotenv").config({ path: "/home/pi/ip-reporter/.env" });

const callServer = async () => {
	let ipAddress = "";
	let commandControlHost = "";
	let clientId;
	let authKey = "";

	process.argv.forEach(argument => {
		if (argument.indexOf("ipAddress") > -1) {
			ipAddress = argument.substring(argument.indexOf("=") + 1);
		}
		if (argument.indexOf("commandControlHost") > -1) {
			commandControlHost = argument.substring(argument.indexOf("=") + 1);
		}
		if (argument.indexOf("clientId") > -1) {
			clientId = argument.substring(argument.indexOf("=") + 1);
		}
		if (argument.indexOf("authKey") > -1) {
			authKey = argument.substring(argument.indexOf("=") + 1);
		}
	});

	console.log(
		`authKey: ${authKey} clientId: ${clientId} commandControlHost: ${commandControlHost} ipAddress: ${ipAddress}`
	);

	const sendIpDataBody = { client: parseInt(clientId), IP: ipAddress };
	const sendIpDataFetchOptions = {
		method: "POST",
		headers: { Authorization: authKey, "Content-Type": "application/json" },
		body: JSON.stringify(sendIpDataBody)
	};
	const sendIpDataResponse = await fetch(`http://${commandControlHost}:8000/api/reportIP`, sendIpDataFetchOptions);
	const sendIpDataJsonResponse = await sendIpDataResponse.json();

	const getServerIpFetchOptions = { headers: { Authorization: authKey } };
	const getServerIpDataResponse = await fetch(
		`http://${commandControlHost}:8000/api/getServerIP`,
		getServerIpFetchOptions
	);
	const getServerIpJsonResponse = await getServerIpDataResponse.json();

	try {
		let writeStream = fs.createWriteStream(`/var/log/ip-reporter.log`, { flags: "a" });

		if (sendIpDataJsonResponse.statusCode === 200) {
			writeStream.write(`${moment().format()} Report IP OK ${JSON.stringify(sendIpDataBody)}${os.EOL}`);
		} else {
			writeStream.write(`${moment().format()} Report IP error ${JSON.stringify(sendIpDataBody)}${os.EOL}`);
			console.log("Report ERROR");
		}

		if (getServerIpJsonResponse.statusCode === 200) {
			writeStream.write(`${moment().format()} Fetch server IP ${JSON.stringify(getServerIpJsonResponse)}${os.EOL}`);
		} else {
			writeStream.write(`${moment().format()} Fetch server IP error${os.EOL}`);
			console.log("Report/Fetch ERROR");
		}
	} catch (writeError) {
		console.log(`Error: Cannot write log ${writeError}`);
	}

	console.log(`${JSON.stringify(getServerIpJsonResponse)}`);
};

callServer();
