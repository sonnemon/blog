import jwt from 'jsonwebtoken';
import config from '../config';
class JsonWebToken {
	constructor() {
		this.secret = config.jwtSecret;
	}
	singToken(payload) {
		return jwt.sign(payload, this.secret);
	}
	verifyToken(token) {
		try {
			const response = jwt.verify(token, this.secret);
			return response;
		} catch (error) {
			return null;
		}
	}
}
export default new JsonWebToken();
