const { primary, success, error } = require("./src/chalk");
const clean = require("./src/clean");
const collectViews = require("./src/collect-views");
const copyPublicFolder = require("./src/copy-public-folder");
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
  prettySize,
  prettyTime,
  resolve,
  spawn,
};
