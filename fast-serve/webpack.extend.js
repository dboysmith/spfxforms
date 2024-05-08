/* eslint-disable no-undef */
/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// you can add your project related webpack configuration here, it will be merged using webpack-merge module
// i.e. plugins: [new webpack.Plugin()]
const webpackConfig = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, "..", "src/components"),
      configs: path.resolve(__dirname, "..", "src/configs"),
      globals: path.resolve(__dirname, "..", "src/globals"),
      models: path.resolve(__dirname, "..", "src/models")
    }
  }
}

// for even more fine-grained control, you can apply custom webpack settings using below function
const transformConfig = function (initialWebpackConfig) {
  // transform the initial webpack config here, i.e.
  // initialWebpackConfig.plugins.push(new webpack.Plugin()); etc.

  return initialWebpackConfig;
}

module.exports = {
  webpackConfig,
  transformConfig
}
