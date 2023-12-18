const { resolve } = require("path");

module.exports = {
  entry: "./dist/index.js",
  output: {
    filename: "index.bundle.js",
    path: resolve("./bundle"),
  },
  mode: "production",
};
