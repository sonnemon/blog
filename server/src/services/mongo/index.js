import { MongoClient } from 'mongodb';
import config from '../../config';
class Mongo {
	constructor() {
		this.url = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
		this.client = null;
	}
	async createConnection() {
		try {
			this.client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
		} catch (error) {
			console.log('MongoDB: Connected error.');
		}
	}
}
export default new Mongo();
