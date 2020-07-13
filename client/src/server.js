const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const express = require('express');
const appExpress = express();
appExpress.use('/public', express.static('public'));
app.prepare().then(() => {
	appExpress.use(handler).listen(process.env.PORT);
});
