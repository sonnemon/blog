const whitelist = [ 'http://localhost:3000', 'http://example2.com' ];
export default function(req, callback) {
	console.log(req.header('Origin'));
	let corsOptions;
	// if (whitelist.indexOf(req.header('Origin')) !== -1) {
	// 	corsOptions = { origin: true };
	// } else {
	// 	corsOptions = { origin: false };
	// }
	corsOptions = { origin: true };
	callback(null, corsOptions);
}
