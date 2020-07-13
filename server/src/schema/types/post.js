import { gql } from 'apollo-server';
export default gql`
	type authorType {
		username: String
		picture: String
		position: String
	}

	type postType {
		_id: ObjectID
		title: String
		url: String
		coverImage: String
		seed: String
		createdAt: DateTime
		status: Boolean
		fields: [JSONObject]
		author: authorType
		uniqid: String
		userId: ObjectID
	}

	type fieldType {
		type: String
		data: JSONObject
	}

	input fieldInput {
		type: String
		data: JSONObject
	}

	input postInput {
		title: String
		status: Boolean
		coverImage: String
		seed: String
		fields: [JSONObject]
	}

	extend type Query {
		post(_id: ObjectID, uniqid: String): postType
		posts(isPrivate: Boolean): [postType]
	}

	extend type Mutation {
		createPost(input: postInput): postType
		updatePost(input: postInput, _id: ObjectID): postType
		deletePost(postId: ObjectID): codeResponseType
	}
`;
