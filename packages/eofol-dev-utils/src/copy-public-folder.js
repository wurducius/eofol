const fs = require("fs");

function copyPublicFolder(publicPath, buildPath) {
  try {
    if (fs.existsSync(publicPath)) {
      fs.cpSync(publicPath, buildPath, { recursive: true });
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(
      error(
        `Error copying public folder ${publicPath} to build folder ${buildPath}`
      )
    );
    return false;
  }
}

module.exports = copyPublicFolder;
