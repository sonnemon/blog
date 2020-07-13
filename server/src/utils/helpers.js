export function defaultUserFields(extra) {
	return {
		picture: '/images/users/default_user.jpg',
		twitter: '',
		linkedin: '',
		github: '',
		website: '',
		fullName: '',
		position: '',
		description: '',
		followers: 0,
		follow: 0,
		isVerified: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		...extra
	};
}

export function defaultPostFields(extra) {
	return {
		likes: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
		fields: [],
		isVerified: false,
		...extra
	};
}
