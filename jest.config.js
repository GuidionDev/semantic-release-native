module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*(\\.|/)(tests|test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/__tests__/**",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  "coverageReporters": ["json-summary"],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  }
}
