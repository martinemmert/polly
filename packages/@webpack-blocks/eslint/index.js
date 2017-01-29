"use strict";

/**
 * ESLint Webpack Block
 *
 * @see https://github.com/MoOx/eslint-loader
 */

var _require = require("@webpack-blocks/webpack2"),
    webpack = _require.webpack;

module.exports = eslint;

/**
 * @return {Function}
 */
function eslint() {

  var plugin = new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        configFile: ".eslintrc",
        cache: true,
        failOnError: false,
        failOnWarning: false
      }
    }
  });

  return function () {
    return {
      module: {
        loaders: [{
          enforce: "pre",
          test: /\.jsx?$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        }]
      },
      plugins: [plugin]
    };
  };
}