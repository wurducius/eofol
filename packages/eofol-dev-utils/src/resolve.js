const fs = require("fs");
const path = require("path");

const resolveApp = (relativePath) =>
  path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = resolveApp;
