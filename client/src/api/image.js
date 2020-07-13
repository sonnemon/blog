import axios from 'axios';
import fetch from 'node-fetch';
export async function uploadImage(file) {
	const myFile = await blobToFile(file);
	let formData = new FormData();
	formData.append('image', myFile);
	try {
		const { data } = await axios.post(`${process.env.API}/upload/coverpost`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return data.nameImage;
	} catch (e) {
		return null;
	}
}

export async function uploadImageDisplay(file) {
	const myFile = await blobToFile(file);
	let formData = new FormData();
	formData.append('image', myFile);
	try {
		const { data } = await axios.post(`${process.env.API}/upload/display`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return data.nameImage;
	} catch (e) {
		return null;
	}
}

async function blobToFile(url) {
	let blob = await fetch(url);
	const file = await blob.blob();
	return file;
}

export async function uploadUserPicture(file) {
	const myFile = await blobToFile(file);
	let formData = new FormData();
	formData.append('image', myFile);
	try {
		const { data } = await axios.post(`${process.env.API}/upload/users`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return data.nameImage;
	} catch (e) {
		return null;
	}
}
