const path = require('path');
const withTM = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

module.exports = {
	images: {
		loader: 'imgix',
		path: 'https://noop/',
	},
	plugins: [
		'module-resolver',
		{
			alias: {
				'~/*': '.',
			},
		},
	],
};
