const { resolve } = require("path");

module.exports = {
  entry: "./dist/index.js",
  output: {
    filename: "index.js",
    path: resolve("./bundle"),
    library: {
      name: "kal",
      type: "window",
    },
  },
  mode: "production",
};
