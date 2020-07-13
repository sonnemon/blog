import uniqid from 'uniqid';
import Mongo from '../../../services/mongo';
import { ObjectID } from 'mongodb';
import { nameEncode } from '../../../utils/format';
import { defaultPostFields } from '../../../utils/helpers';
class Post {
	constructor() {}
	async getOne(_id) {
		try {
			const post = await Mongo.client
				.db()
				.collection('posts')
				.findOne({ _id: ObjectID(_id) });
			return post;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async getByUnique(uniqid) {
		try {
			const post = await Mongo.client.db().collection('posts').findOne({ uniqid });
			return post;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async getMany(args) {
		try {
			const posts = await Mongo.client.db().collection('posts').find(args).toArray();
			return posts;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async create(input, userId) {
		const newuniqid = uniqid.process();
		const fields = defaultPostFields({
			userId,
			url: `${nameEncode(input.title)}-${newuniqid}`,
			uniqid: newuniqid,
			...input,
			converImage: `images/posts/covers/${input.coverImage}`
		});
		try {
			const result = await Mongo.client.db().collection('posts').insertOne(fields);
			return ObjectID(result.insertedId);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async update(postId, input) {
		// if ('title' in input) {
		// 	const newuniqid = uniqid.process();
		// 	input.url = `${nameEncode(input.title)}-${newuniqid}`;
		// 	input.uniqid = newuniqid;
		// }
		try {
			const { result } = await Mongo.client
				.db()
				.collection('posts')
				.updateOne({ _id: ObjectID(postId) }, { $set: input });
			return result.ok;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async delete(postId) {
		try {
			const { result } = await Mongo.client
				.db()
				.collection('posts')
				.deleteOne({ _id: ObjectID(postId) });
			return result.ok;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
export default Post;
