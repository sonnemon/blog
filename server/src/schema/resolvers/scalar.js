import {
	JSONResolver,
	JSONObjectResolver,
	URLResolver,
	ObjectIDResolver,
	DateTimeResolver
} from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';
export default {
	JSON: JSONResolver,
	JSONObject: JSONObjectResolver,
	URL: URLResolver,
	ObjectID: ObjectIDResolver,
	DateTime: DateTimeResolver,
	UploadFile: GraphQLUpload
};
