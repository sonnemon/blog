import { gql } from 'apollo-server';
export default gql`
	type loginResponse {
		token: String
	}

	input loginInput {
		username: String!
		password: String!
	}

	input registerInput {
		username: String!
		password: String!
		email: String!
	}

	extend type Query {
		login(input: loginInput!): loginResponse
	}

	extend type Mutation {
		register(input: registerInput!): codeResponseType
	}
`;
