// import dotenv from 'dotenv';
// dotenv.config();

export default {
	apiPort: process.env.API_PORT,
	mongo: {
		host: process.env.MONGO_HOST,
		port: process.env.MONGO_PORT,
		dbName: process.env.DB_NAME
	},
	jwtSecret: process.env.JWT_SECRET
};
