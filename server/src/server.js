import cors from 'cors';
import express from 'express';
import schema from './schema';
import config from './config';
import Mongo from './services/mongo';
import upload from './routers/uploads';
import corsDelegate from './utils/cors';
import { manageContext } from './utils/authorization';
import { ApolloServer } from 'apollo-server-express';

(async () => {
	await Mongo.createConnection();

	const server = new ApolloServer({
		...schema,
		cors: true,
		introspection: true,
		playground: true,
		context: manageContext
	});
	const app = express();

	server.applyMiddleware({ app });
	app.use(express.static('public'));
	app.use(cors(corsDelegate));
	app.use('/upload', upload);
	app.listen({ port: config.apiPort }, () => {
		console.log(`http://localhost:${config.apiPort}${server.graphqlPath}`);
	});
})();
