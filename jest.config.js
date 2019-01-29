module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "collectCoverage": true,
  "coverageReporters": [
    "lcov",
  "text",
  "text-summary"],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!**/coverage/**",
   "!**/test-tools/**",
  "!**/r-scripts/**"],
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 0,
      "lines": 50,
      "statements": 50
    }
  },
};
