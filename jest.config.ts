module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    testMatch: ["<rootDir>/src/tests/**/*.(test|spec).ts"],
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/$1",
      "@test/(.*)": "<rootDir>/tests/$1",
      "axios": "axios/dist/node/axios.cjs"
    },
    restoreMocks: true,
  };