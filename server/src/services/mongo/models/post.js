import { Schema } from 'mongoose';

export default new Schema({
	title: String,
	text: String,
	nameFilter: String
});
