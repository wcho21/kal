const { resolve } = require("path");

module.exports = {
  entry: "./tsc-out/index.js",
  output: {
    filename: "index.min.js",
    path: resolve("./dist"),
    library: {
      name: "kal",
      type: "window",
    },
  },
  target: ["web", "es2015", "browserslist"],
  mode: "production",
};
