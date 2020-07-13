import { ObjectID } from 'mongodb';
import Mongo from '../../../services/mongo';
import JsonWebToken from '../../../utils/jsonwebtoken';
import Crypt from '../../../utils/crypt';
import { defaultUserFields } from '../../../utils/helpers';
class Auth {
	constructor() {}
	async login({ username, password }) {
		try {
			const user = await Mongo.client.db().collection('users').findOne(
				{
					username
				},
				{
					username: 1,
					picture: 1,
					password: 1
				}
			);
			if (!user) {
				return null;
			}
			const isValidPassword = Crypt.compare(password, user.password);
			if (isValidPassword) {
				const token = JsonWebToken.singToken({
					user: {
						_id: ObjectID(user._id),
						username: user.username,
						picture: user.picture
					}
				});
				return token;
			} else {
				return null;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async register(input) {
		try {
			const passwordHashed = Crypt.hash(input.password);
			const fields = defaultUserFields({ ...input, password: passwordHashed });
			const result = await Mongo.client.db().collection('users').insertOne(fields);
			const user = await Mongo.client.db().collection('users').findOne({
				_id: ObjectID(result.insertedId)
			});
			return user;
		} catch (error) {
			return null;
		}
	}
	async verifyEmail(email) {
		try {
			const users = await Mongo.client.db().collection('users').find({ email }).toArray();
			if (users.length == 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	async verifyUsername(username) {
		try {
			const users = await Mongo.client.db().collection('users').find({ username }).toArray();
			if (users.length == 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
export default Auth;
