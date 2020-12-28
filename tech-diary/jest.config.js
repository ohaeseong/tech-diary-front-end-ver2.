module.exports = {
    moduleDirectories: ['node_modules', '.'],
    moduleNameMapper: {
        '^/(.*)/': "<rootDir>/$1",
    },
    preset: 'ts-jest',
    globals: {
        "ts-jest": {
          "tsConfig": '<rootDir>/tsconfig.json'
        }
    },

    transform: {
        "\\.tsx?$": "ts-jest",
    },
};