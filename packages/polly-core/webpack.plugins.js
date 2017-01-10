const {webpack} = require("@webpack-blocks/webpack2");

exports.basePlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ["vendor", "manifest"],
  })
];

exports.productionPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    },
    output: {
      comments: false
    },
    screwIe8: true,
    sourceMap: false
  })
];