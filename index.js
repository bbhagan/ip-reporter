const fetch = require("node-fetch");
require("dotenv").config();

const callServer = async () => {
	const SERVER_POST_URL = process.env.SERVER_POST_URL;
	const AUTH_KEY = process.env.AUTH_KEY;

	console.log(`process.env: ${JSON.stringify(process.env)}`);
	console.log(`SERVER_POST_URL: ${SERVER_POST_URL}`);

	let ipAddress = "";
	let clientId = 0;

	process.argv.forEach(argument => {
		if (argument.indexOf("ipAddress") > -1) {
			ipAddress = argument.substring(argument.indexOf("=") + 1);
		}
		if (argument.indexOf("clientId") > -1) {
			clientId = parseInt(argument.substring(argument.indexOf("=") + 1));
		}
	});

	const fetchOptions = {
		method: "POST",
		headers: { Authorization: AUTH_KEY, "Content-Type": "application/json" },
		body: JSON.stringify({ client: clientId, IP: ipAddress })
	};
	const response = await fetch(SERVER_POST_URL, fetchOptions);
	const jsonResponse = await response.json();
	console.log(jsonResponse);
};

callServer();
