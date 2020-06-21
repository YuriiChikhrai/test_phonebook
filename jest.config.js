const { join } = require("path");

module.exports = {
  testEnvironment: "node",
  testMatch: [join(__dirname, "api", "**", "*.test.js")],
};
