const webpack = require("webpack");

const path = require("path");
const rootPath = path.resolve(__dirname, "../");
const srcPath = path.resolve(__dirname, "../src");
const stylesPath = path.resolve(__dirname, "../src/assets/styles");
const autoprefixer = require("autoprefixer");

module.exports = {
  // Tell webpack where to start the bundling process
  entry: {
    app: srcPath + "/index.tsx",
  },

  // Output to build/
  output: {
    filename: "[name].[contenthash:8].js",
    path: rootPath + "/build",
    publicPath: "/",
  },

  resolve: {
    // Search for modules in src and node_modules
    // This enables absolute imports for files under src
    modules: [srcPath, "node_modules"],
    // So you don't have to specify the file extension when importing
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  // Note: Do not use optimization in dev
  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        // Split node_modules into separate file
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  // The performance hints are not really applicable for us as we're
  // not making a public website. It mostly complains about file sizes.
  // https://webpack.js.org/configuration/performance/
  performance: {
    hints: false,
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      // https://github.com/TypeStrong/ts-loader
      { test: /\.ts(x?)$/, exclude: /node_modules/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      { test: /\.css$/, loader: ["style-loader", "css-loader"] },

      // SASS files are transformed by many loaders
      // Loaders run from bottom to top (sass-resources-loader => ... => style-loader)
      {
        test: /\.scss$/,
        include: srcPath,
        use: [
          {
            // Moves css into <style> tags in <head>
            // https://github.com/webpack-contrib/style-loader
            loader: require.resolve("style-loader"),
          },

          {
            // Automatically create TS definition files for CSS modules
            // https://github.com/Megaputer/dts-css-modules-loader
            loader: "dts-css-modules-loader",
            options: {
              namedExport: true,
              banner: "// This file is generated automatically",
            },
          },
          {
            // Handles CSS. Supports creating CSS modules.
            // https://github.com/webpack-contrib/css-loader
            loader: "css-loader",
            options: {
              // According to
              // https://github.com/postcss/postcss-loader#css-modules
              // https://github.com/webpack-contrib/css-loader#importloaders
              // you need importLoaders to make CSS modules work with PostCSS.
              // From testing that does not seem to be true.
              // importLoaders: 2,

              // Create CSS modules
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]", // TODO Fix different names on dev/prod
              },
              localsConvention: "camelCaseOnly",
            },
          },
          {
            // Transforms CSS in various ways
            // https://github.com/postcss/postcss-loader
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              // autoprefixer automatically adds prefixes for different browsers if neccessary
              plugins: () => [autoprefixer()],
            },
          },
          {
            // Transforms scss to css
            // https://github.com/webpack-contrib/sass-loader
            loader: require.resolve("sass-loader"),
          },
          {
            // Makes SASS resources available to all scss files.
            // https://github.com/shakacode/sass-resources-loader
            loader: "sass-resources-loader",
            options: {
              resources: [stylesPath + "/global.scss"],
            },
          },
        ],
      },

      // Allows us to import svg files as components
      // https://github.com/boopathi/react-svg-loader
      // https://github.com/babel/babel-loader
      {
        test: /\.svg$/,
        use: ["babel-loader", "react-svg-loader"],
      },

      // Enables support for loading fonts (woff, woff2, eot, ttf, otf).
      // Fonts are output to /build/fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts",
        },
      },

      // Enables support for loading images
      {
        test: /\.(jpg|png|jpeg)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },

  // Remove unused locales (we only use "en" which is default)
  // This scenario is so common that webpack docs use it as example
  // https://webpack.js.org/plugins/ignore-plugin/
  ignoreMomentLocales: new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
};
