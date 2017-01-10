/**
 * ESLint Webpack Block
 *
 * @see https://github.com/MoOx/eslint-loader
 */

const {webpack} = require("@webpack-blocks/webpack2");

module.exports = eslint;

/**
 * @return {Function}
 */
function eslint() {

  let plugin = new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        configFile: ".eslintrc",
        cache: true,
        failOnError: false,
        failOnWarning: false,
      },
    },
  });

  return () => {
    return {
      module: {
        loaders: [
          {
            enforce: "pre",
            test: /\.jsx?$/,
            loader: "eslint-loader",
            exclude: /node_modules/,
          },
        ],
      },
      plugins: [plugin],
    };
  };
}
