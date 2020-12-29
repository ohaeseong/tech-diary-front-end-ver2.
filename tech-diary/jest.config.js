module.exports = {
	moduleDirectories: ['node_modules', '.'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	moduleNameMapper: {
		'^/(.*)/': '<rootDir>/$1',
	},
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.test.json',
		},
	},

	transform: {
		'\\.tsx?$': 'ts-jest',
	},
};
