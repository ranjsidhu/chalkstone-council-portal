import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!lucide-react/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  globals: {
    fetch: global.fetch,
  },
};

export default createJestConfig(config);
