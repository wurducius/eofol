const fs = require("fs");
const { error } = require("./chalk");

function clean(buildPath) {
  try {
    if (fs.existsSync(buildPath)) {
      fs.rmSync(buildPath, { recursive: true });
    }
  } catch (e) {
    console.log(error("Build failed"));
  }
}

module.exports = clean;
