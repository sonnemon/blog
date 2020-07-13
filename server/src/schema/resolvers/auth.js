import Auth from './class/auth';
import { ApolloError } from 'apollo-server';
export default {
	Query: {
		login: async (parent, { input }, context, info) => {
			const auth = new Auth();
			const token = await auth.login(input);
			if (token == null) {
				throw new ApolloError('LOGIN_FAILED');
			}
			return {
				token
			};
		}
	},
	Mutation: {
		register: async (parent, { input }, context, info) => {
			const auth = new Auth();
			const isValidUsername = await auth.verifyUsername(input.username);
			if (!isValidUsername) {
				throw new ApolloError('USERNAME_ALREADY_EXIST');
			}
			const isValidEmail = await auth.verifyEmail(input.email);
			if (!isValidEmail) {
				throw new ApolloError('EMAIL_ALREADY_EXIST');
			}
			const user = await auth.register(input);
			if (user == null) {
				throw new ApolloError('REGISTER_FAILED');
			}
			return { code: 'REGISTERED' };
		}
	}
};
