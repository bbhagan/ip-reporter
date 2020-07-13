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

	process.argv.forEach((argument) => {
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

	const sendIpDataBody = { client: parseInt(clientId), IP: ipAddress };
	const sendIpDataFetchOptions = {
		method: "POST",
		headers: { Authorization: authKey, "Content-Type": "application/json" },
		body: JSON.stringify(sendIpDataBody),
	};
	const sendIpDataResponse = await fetch(`http://${commandControlHost}/api/reportIP`, sendIpDataFetchOptions);
	const sendIpDataJsonResponse = await sendIpDataResponse.json();
	try {
		let writeStream = fs.createWriteStream(`/var/log/ip-reporter/ip-reporter.log`, { flags: "a" });

		if (sendIpDataJsonResponse.statusCode === 200) {
			writeStream.write(`${moment().format()} Report IP OK ${JSON.stringify(sendIpDataBody)}${os.EOL}`);
		} else {
			writeStream.write(`${moment().format()} Report IP error ${JSON.stringify(sendIpDataBody)}${os.EOL}`);
			console.log("Report ERROR");
		}
	} catch (writeError) {
		console.log(`Error: Cannot write log ${writeError}`);
	}

	//This hands off the Server IP address to the shellscript (using STOUT)
	console.log(sendIpDataJsonResponse.serverIP);
};

callServer();
