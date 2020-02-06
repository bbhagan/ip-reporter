const fetch = require("node-fetch");
const fs = require("fs");
const os = require("os");
const moment = require("moment");
require("dotenv").config({ path: "/home/pi/ip-reporter/.env" });

const callServer = async () => {
	const SERVER_POST_URL = process.env.SERVER_POST_URL;
	const AUTH_KEY = process.env.AUTH_KEY;
	const CLIENT_ID = process.env.CLIENT_ID;
	const LOGS_PATH = process.env.LOGS_PATH;

	let ipAddress = "";

	//Make sure logs dir exists
	try {
		fs.statSync(LOGS_PATH).isDirectory();
	} catch (e) {
		try {
			fs.mkdir(LOGS_PATH, () => {
				console.log(`Made logs dir: ${LOGS_PATH}`);
			});
		} catch (createDirError) {
			console.log(`Cannot create logs dir ${LOGS_PATH}`);
		}
	}

	process.argv.forEach(argument => {
		if (argument.indexOf("ipAddress") > -1) {
			ipAddress = argument.substring(argument.indexOf("=") + 1);
		}
	});

	console.log(`SERVER_POST_URL: ${SERVER_POST_URL}`);

	const jsonBody = { client: parseInt(CLIENT_ID), IP: ipAddress };
	const fetchOptions = {
		method: "POST",
		headers: { Authorization: AUTH_KEY, "Content-Type": "application/json" },
		body: JSON.stringify(jsonBody)
	};
	const response = await fetch(SERVER_POST_URL, fetchOptions);
	const jsonResponse = await response.json();

	try {
		let writeStream = fs.createWriteStream(`${LOGS_PATH}/log.txt`, { flags: "a" });

		if (jsonResponse.statusCode === 200) {
			writeStream.write(`${moment().format()} Report OK ${JSON.stringify(jsonBody)}${os.EOL}`);
			console.log("Report OK");
		} else {
			writeStream.write(`${moment().format()} ${JSON.stringify(jsonBody)}${os.EOL}`);
			console.log("Report ERROR");
		}
	} catch (writeError) {
		console.log(`Error: Cannot write log ${writeError}`);
	}
};

callServer();
