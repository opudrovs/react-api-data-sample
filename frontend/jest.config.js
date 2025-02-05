const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  clearMocks: true, // Ensures all mocks are cleared between tests
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Ensures path alias resolution works
  },
};

module.exports = createJestConfig(customJestConfig);
