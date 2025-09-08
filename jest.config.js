const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextjest = require("next/jest");

const createJestConfig = nextjest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
});

module.exports = jestConfig;
