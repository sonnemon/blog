const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = (env) => {
	return {
		entry: [ '@babel/polyfill', `./src/server.js` ],
		target: 'node',
		node: {
			__filename: true,
			__dirname: true
		},
		externals: [ nodeExternals() ],
		module: {
			rules: [
				{
					test: /\.js?$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								babelrc: true
							}
						}
					],
					exclude: /node_modules/
				}
			]
		},
		plugins: [
			new webpack.NamedModulesPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		],
		output: { path: path.join(__dirname, env.dist), filename: 'server.js' }
	};
};
