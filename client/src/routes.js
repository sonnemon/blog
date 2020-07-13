const routes = require('next-routes');

module.exports = routes()
	.add('home', '/', 'home')
	.add('post', '/post/:url', 'post')
	.add('signin', '/signin', 'signin')
	.add('signup', '/signup', 'signup')
	.add('profile', '/profile', 'profile')
	.add('admin', '/admin', 'admin')
	.add('home2', '/home2', 'home2')
	.add('createpost', '/editor/post/create', 'createpost')
	.add('updatepost', '/editor/post/update/:_id', 'updatepost');
