import JsonWebToken from './jsonwebtoken';
function checkSession(token, scope) {
	const isValidToken = JsonWebToken.verifyToken(token);
	if (!isValidToken) {
		return { error: 'Unauthorized' };
	}
	// if (!vToken.scopes.includes(scope)) {
	// 	return 'Forbidden';
	// }
	return isValidToken;
}

export function manageContext({ req }) {
	let context = {};
	if (req.headers.authorization) {
		const token = (req.headers.authorization || '').replace('Bearer ', '');
		const result = checkSession(token);
		if ('error' in result) {
			context.user = null;
			context.authError = result.error;
		} else {
			context.user = result.user;
		}
	} else {
		context.user = null;
		context.authError = 'Unauthorized';
	}
	return context;
}
