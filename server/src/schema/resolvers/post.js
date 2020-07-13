import Post from './class/post';
import User from './class/user';
import { ApolloError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
export default {
	Query: {
		posts: combineResolvers(
			(parent, { isPrivate = false }, context, info) => {
				if (isPrivate) {
					if (context.user == null) {
						throw new ApolloError(context.authError);
					}
				}
				skip;
			},
			async (parent, { isPrivate = false }, context, info) => {
				const filters = {};
				if (isPrivate) {
					filters.userId = context.user._id;
				} else {
					filters.status = true;
				}
				const post = new Post();
				const result = await post.getMany(filters);
				if (result == null) {
					throw new ApolloError('ERROR_GET_POSTS');
				}
				return result;
			}
		),
		post: async (parent, { _id, uniqid }, context, info) => {
			const post = new Post();
			let result = null;
			if (_id) {
				result = await post.getOne(_id);
			} else {
				result = await post.getByUnique(uniqid);
			}

			if (result == null) {
				throw new ApolloError('POST_NOT_FOUND');
			}
			return result;
		}
	},
	Mutation: {
		createPost: combineResolvers(
			(parent, args, context, info) => {
				if (context.user == null) {
					throw new ApolloError(context.authError);
				}
				skip;
			},
			async (parent, { input }, context, info) => {
				const post = new Post();
				const _id = await post.create(input, context.user._id);
				if (_id == null) {
					throw new ApolloError('ERROR_CREATE_POST');
				}
				const result = await post.getOne(_id);
				return result;
			}
		),
		updatePost: combineResolvers(
			(parent, args, context, info) => {
				if (context.user == null) {
					throw new ApolloError(context.authError);
				}
				skip;
			},
			async (parent, { _id, input }, context, info) => {
				const post = new Post();
				const isOk = await post.update(_id, input);
				if (isOk == null) {
					throw new ApolloError('ERROR_UPDATE_POST');
				}
				const result = await post.getOne(_id);
				return result;
			}
		),
		deletePost: combineResolvers(
			(parent, args, context, info) => {
				if (context.user == null) {
					throw new ApolloError(context.authError);
				}
				skip;
			},
			async (parent, { postId }, context, info) => {
				const post = new Post();
				const isOk = await post.delete(postId);
				if (isOk == null) {
					throw new ApolloError('ERROR_DELETE_POST');
				}
				return { code: 'POST_DELETED' };
			}
		)
	},
	postType: {
		author: async ({ userId }, args, context, info) => {
			const user = new User();
			const result = await user.getAuthor(userId);
			return result;
		}
	}
};
