import { gql } from 'apollo-server';
export default gql`
	type File {
		filename: String!
	}

	extend type Mutation {
		singleUpload(file: UploadFile!): File!
	}
`;
