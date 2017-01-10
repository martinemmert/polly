const {
  addPlugins,
  createConfig,
  defineConstants,
  entryPoint,
  env,
  setOutput,
  sourceMaps,
  performance,
  setContext
} = require("@webpack-blocks/webpack2");
const babel = require("@webpack-blocks/babel6");
const devServer = require("@webpack-blocks/dev-server2");
const eslint = require("@webpack-blocks/eslint");
const plugins = require("./webpack.plugins");
const pkg = require("./package.json");
const path = require("path");

let config = createConfig([
  defineConstants({"process.env.NODE_ENV": process.env.NODE_ENV || "development"}),
  setContext(path.join(__dirname, "src")),
  entryPoint({
    index: "./app/main.js",
    vendor: Object.keys(pkg.dependencies || {}),
    styles: "./assets/styles/main.css"
  }),
  setOutput({
    path: path.join(__dirname, "build"),
    filename: "[name].[hash:8].js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].[hash:8].js",
  }),
  eslint(),
  babel({presets: ["es2015"], plugins: ["transform-flow-strip-types"]}),
  addPlugins(plugins.basePlugins),
  env("development", [sourceMaps(), devServer({stats: "errors-only"}), performance({hints: false})]),
  env("production", [sourceMaps(), addPlugins(plugins.productionPlugins)])
]);

module.exports = config;