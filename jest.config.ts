export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { rootDir: '.' }],
        // process `*.tsx` files with `ts-jest`
    },
    rootDir: '.',
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        '^~/(.*)$': '<rootDir>/src/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    },
};
