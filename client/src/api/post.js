import axios from 'axios';
import config from '../config';
export async function createPost(variables, authToken) {
	const gql = `
    mutation CreatePostMutation(
      $input:postInput
    ){
      createPost(input:$input){
        _id
        title
        url
        coverImage
        seed
        createdAt
        status
        fields
      }
    }
  `;
	try {
		const { data } = await axios.post(
			config.endpoint,
			{
				query: gql,
				variables
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);
		return data.data.createPost;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updatePost(variables, authToken) {
	const gql = `
		mutation UpdatePostMutation(
			$input: postInput 
			$_id: ObjectID
		){
			updatePost(
				input:$input,
				_id:$_id
			){
				_id
				title
        url
        coverImage
        seed
        createdAt
        status
				fields,
				author{
					username
					picture
					position
				}
			}
		}
  `;
	try {
		const { data } = await axios.post(
			config.endpoint,
			{
				query: gql,
				variables
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);
		return data.data.updatePost;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getOne(variables, authToken) {
	const gql = `
		query getPostQuery(
			$_id: ObjectID
		){
			post(
				_id: $_id
			){
				_id
				title
				url
				coverImage
				seed
				createdAt
				status
				fields
				uniqid
				author{
					username
					picture
					position
				}
			}
		}
  `;
	try {
		const { data } = await axios.post(
			config.endpoint,
			{
				query: gql,
				variables
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);
		return data.data.post;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getList(variables, authToken) {
	const gql = `
		query GetPostsQuery(
			$isPrivate: Boolean
		){
			posts(
				isPrivate: $isPrivate
			){
				_id
				title
				url
				coverImage
				createdAt
				seed
				status
			}
		}
	`;
	try {
		const { data } = await axios.post(
			config.endpoint,
			{
				query: gql,
				variables
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json'
				}
			}
		);
		return data.data.posts;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getOnePublic(variables) {
	const gql = `
		query getPostQuery(
			$_id: ObjectID
			$uniqid: String
		){
			post(
				_id: $_id
				uniqid: $uniqid
			){
				_id
				title
				url
				coverImage
				seed
				createdAt
				status
				fields
				author{
					username
					picture
					position
				}
			}
		}
	`;
	try {
		const { data } = await axios.post(
			config.endpoint,
			{
				query: gql,
				variables
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data.data.post;
	} catch (error) {
		console.log(error);
		return null;
	}
}
