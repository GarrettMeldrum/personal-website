export function getBasicAuthHeader() {
	const { CLIENT_ID, CLIENT_SECRET } = process.env;
	
	if (!CLIENT_ID || !CLIENT_SECRET) {
		throw new Error("Missing CLIENT_ID or CLIENT_SECRET in env");
		}

	const encoded = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
	return `Basic ${encoded}`;
}
