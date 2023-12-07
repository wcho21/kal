/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // default settings from ts-jest
  preset: 'ts-jest',
  testEnvironment: 'node',

  // custum settings
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
