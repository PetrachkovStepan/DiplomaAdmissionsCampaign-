/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  preset: "ts-jest",
  modulePaths: ["./tsconfig.json"],
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    ".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg|webp)$":
      "jest-transform-stub",
  },
};