module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.ts",
  ],
  setupFiles: ['<rootDir>setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
};
