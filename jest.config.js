/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  setupFilesAfterEnv: [
    "/Users/anandkushwaha/Desktop/Oyo_Backend/server/singleton.ts",
  ],
};
