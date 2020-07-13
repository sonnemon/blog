import { ApolloError } from 'apollo-server';
export default {
	Mutation: {
		singleUpload: async (parent, args, context, info) => {
			console.log('ksm', args);
			const file = await args.file;
			const { createReadStream, filename, mimetype } = file;
			console.log(createReadStream, filename, mimetype);
			return {
				filename: 'Gaa'
			};
		}
	}
};
