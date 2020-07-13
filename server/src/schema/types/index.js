import { gql } from 'apollo-server-express';

import postSchema from './post';
import scalarSchema from './scalar';
import authSchema from './auth';
import userSchema from './user';
import responseSchema from './responses';
import imageSchema from './image';

const linkSchema = gql`
	scalar Date

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;
export default [
	linkSchema,
	postSchema,
	scalarSchema,
	authSchema,
	userSchema,
	responseSchema,
	imageSchema
];
