module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "<rootDir>/test/mocks/setup.ts",
    "@testing-library/jest-native/extend-expect",
  ],

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@expo|expo(nent)?|expo-router|expo-modules-core|@expo/vector-icons|moti)",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.config.js",
  ],
  coverageReporters: ["text", "lcov"],
};
