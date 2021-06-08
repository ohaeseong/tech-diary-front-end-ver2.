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
	images: {
		domains: ['localhost', 'avatars.githubusercontent.com'],
		loader: 'imgix',
		path: '',
		// deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// imageSizes: [300, 300, 300, 300, 300, 300, 300, 400],
	},
};
// module.exports = compose([
