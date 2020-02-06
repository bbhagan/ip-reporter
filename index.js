const fetch = require("node-fetch");
require("dotenv").config();

const callServer = async () => {
	const SERVER_POST_URL = process.env.SERVER_POST_URL;
	const AUTH_KEY = process.env.AUTH_KEY;
	const CLIENT_ID = process.env.CLIENT_ID;

	console.log(`process.env: ${JSON.stringify(process.env)}`);
	console.log(`SERVER_POST_URL: ${SERVER_POST_URL}`);

	let ipAddress = "";
	let clientId = 0;

	process.argv.forEach(argument => {
		if (argument.indexOf("ipAddress") > -1) {
			ipAddress = argument.substring(argument.indexOf("=") + 1);
		}
	});

	const fetchOptions = {
		method: "POST",
		headers: { Authorization: AUTH_KEY, "Content-Type": "application/json" },
		body: JSON.stringify({ client: CLIENT_ID, IP: ipAddress })
	};
	const response = await fetch(SERVER_POST_URL, fetchOptions);
	const jsonResponse = await response.json();
	console.log(jsonResponse);
};

callServer();
