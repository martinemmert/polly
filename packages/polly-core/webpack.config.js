const {
  addPlugins,
  createConfig,
  defineConstants,
  entryPoint,
  setOutput,
  env
} = require("@webpack-blocks/webpack2");
const babel = require("@webpack-blocks/babel6");
const eslint = require("@webpack-blocks/eslint");
const plugins = require("./webpack.plugins");

let config = createConfig([
  defineConstants({"process.env.NODE_ENV": process.env.NODE_ENV || "development"}),
  entryPoint("./src/index"),
  setOutput({
    path: __dirname + "/lib",
    filename: "polly-core.js",
    library: "polly-core",
    libraryTarget: "umd",
    umdNamedDefine: true,
  }),
  eslint(),
  babel({presets: ["es2015"], plugins: ["transform-flow-strip-types"]}),
  addPlugins(plugins.basePlugins),
  env("production", [
    setOutput({
      filename: "polly-core.min.js"
    }),
    addPlugins(plugins.productionPlugins)
  ]),
]);

module.exports = config;