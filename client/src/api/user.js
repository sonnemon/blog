import axios from 'axios';
import config from '../config';
export async function getUserLogued(variables, authToken) {
	if (!authToken) {
		return null;
	}
	const gql = `
    query PrivateProfileQuery{
      privateProfile{
        username
        email
        picture
        twitter
        linkedin
        github
        website
        fullName
        position
        description
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
		return data.data.privateProfile;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateProfile(variables, authToken) {
	if (!authToken) {
		return null;
	}
	const gql = `
		mutation UpdateProfileMutation(
			$input:profileInput!
		){
			updateProfile(
				input:$input
			){
				username
				email
				picture
				twitter
				linkedin
				github
				website
				fullName
				position
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
		return data.data.updateProfile;
	} catch (error) {
		console.log(error);
		return null;
	}
}
