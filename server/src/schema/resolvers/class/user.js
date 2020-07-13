import { ObjectID } from 'mongodb';
import Mongo from '../../../services/mongo';

class User {
	constructor() {}
	async getProfile(username) {
		try {
			const user = await Mongo.client.db().collection('users').findOne({ username });
			return user;
		} catch (error) {
			return null;
		}
	}
	async getAuthor(userId) {
		try {
			const user = await Mongo.client
				.db()
				.collection('users')
				.findOne({ _id: ObjectID(userId) });
			return user;
		} catch (error) {
			return null;
		}
	}
	async updateProfile(_id, input) {
		try {
			const { result } = await Mongo.client
				.db()
				.collection('users')
				.updateOne({ _id: ObjectID(_id) }, { $set: input });
			return result.ok;
		} catch (error) {
			console.log('gaa', error);
			return null;
		}
	}
}
export default User;
