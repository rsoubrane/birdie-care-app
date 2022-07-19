export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js'
	},
	setupFiles: ['jest-canvas-mock'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
