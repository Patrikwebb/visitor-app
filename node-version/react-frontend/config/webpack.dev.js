const path = require("path");
const srcPath = path.resolve(__dirname, "../src");

// This plugin takes an HTML file as template and adds the generated bundle
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Required to use some webpack plugins
const webpack = require("webpack");

const common = require("./webpack.common.js");

module.exports = {
  mode: "development",

  // Configuration shared by several configs
  entry: common.entry,
  module: common.module,
  resolve: common.resolve,
  performance: common.performance,

  // Override filename for dev (avoids path issues)
  output: Object.assign(common.output, { filename: "[name]-[hash:8].js" }),

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    // https://webpack.js.org/configuration/dev-server/

    // Serve files from build
    contentBase: "../build",

    // Enable Hot Module Replacement (live reload)
    hot: true,

    // Show errors full screen in the browser
    overlay: true,

    // Port (obviously)
    port: 3000,

    // Setting host to 0.0.0.0 makes the server public
    host: "0.0.0.0",

    // Serve index.html on 404 (see docs for detail)
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath + "/template.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    common.ignoreMomentLocales
  ]
};
