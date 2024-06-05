const fs = require("fs");
const path = require("path");

const getAppName = () =>
  JSON.parse(
    fs.readFileSync(
      path.resolve(fs.realpathSync(process.cwd()), "package.json")
    )
  ).name;

module.exports = getAppName;
