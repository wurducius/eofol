const { primary, success, error } = require("./src/chalk");
const clean = require("./src/clean");
const collectViews = require("./src/collect-views");
const copyPublicFolder = require("./src/copy-public-folder");
const getAppName = require("./src/get-app-name");
const prettySize = require("./src/pretty-size");
const prettyTime = require("./src/pretty-time");
const resolve = require("./src/resolve");
const spawn = require("./src/spawn");

module.exports = {
  primary,
  success,
  error,
  clean,
  collectViews,
  copyPublicFolder,
  getAppName,
  prettySize,
  prettyTime,
  resolve,
  spawn,
};
