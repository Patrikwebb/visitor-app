const path = require("path");
const srcPath = path.resolve(__dirname, "../src");

// This plugin removes the contents of a folder before building
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// This plugin takes an HTML file as template and adds the generated bundle
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = {
  mode: "production",

  // Configuration shared by several configs
  entry: common.entry,
  output: common.output,
  module: common.module,
  resolve: common.resolve,
  optimization: common.optimization,
  performance: common.performance,

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: srcPath + "/template.html",
      minify: { removeComments: true }
    }),
    common.ignoreMomentLocales
  ]
};
