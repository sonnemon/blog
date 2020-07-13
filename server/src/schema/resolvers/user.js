import User from './class/user';
import { ApolloError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export default {
	Query: {
		publicProfile: async (parent, { username }, context, info) => {
			const user = new User();
			const profile = await user.getProfile(username);
			if (profile == null) {
				throw new ApolloError('PROFILE_NOT_FOUND');
			}
			return profile;
		},
		privateProfile: combineResolvers(
			(parent, args, context, info) => {
				if (context.user == null) {
					throw new ApolloError(context.authError);
				}
				skip;
			},
			async (parent, args, context, info) => {
				const user = new User();
				const profile = await user.getAuthor(context.user._id);
				if (profile == null) {
					throw new ApolloError('PROFILE_NOT_FOUND');
				}
				return profile;
			}
		)
	},
	Mutation: {
		updateProfile: combineResolvers(
			(parent, child, context, info) => {
				if (context.user == null) {
					throw new ApolloError(context.authError);
				}
				skip;
			},
			async (parent, { input }, context, info) => {
				const user = new User();
				const result = await user.updateProfile(context.user._id, input);
				if (result == null) {
					throw new ApolloError('ERROR_UPDATE_PROFILE');
				}
				const profile = await user.getProfile(context.user.username);
				return profile;
			}
		)
	}
};
