import { gql } from 'apollo-server';
export default gql`
	type profileType {
		username: String
		email: String
		picture: String
		twitter: String
		linkedin: String
		github: String
		website: String
		fullName: String
		position: String
		description: String
	}

	input profileInput {
		picture: String
		twitter: String
		linkedin: String
		github: String
		website: String
		fullName: String
		position: String
		description: String
	}

	extend type Query {
		publicProfile(username: String!): profileType
		privateProfile: profileType
	}

	extend type Mutation {
		updateProfile(input: profileInput!): profileType
	}
`;
