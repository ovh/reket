module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: { '^.+\\.js$': '<rootDir>/jest.preprocessor.js' },
};
