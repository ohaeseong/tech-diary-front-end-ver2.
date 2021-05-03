const withTM = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

module.exports = {
	plugins: [
		'module-resolver',
		{
			alias: {
				'~/*': '.',
			},
		},
	],
};
