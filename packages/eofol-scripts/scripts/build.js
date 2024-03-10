const webpack = require("webpack");

const { clean } = require("@eofol/eofol-dev-utils");
const { copyPublicFolder } = require("@eofol/eofol-dev-utils");
const { prettySize } = require("@eofol/eofol-dev-utils");
const { prettyTime } = require("@eofol/eofol-dev-utils");
const { primary, error, success } = require("@eofol/eofol-dev-utils");

const { BUILD_PATH, PUBLIC_PATH } = require("../config/paths");

const createConfig = require("../config/webpack.config");

console.log(primary("Starting build..."));

const config = createConfig("production", false);
const compiler = webpack(config);

clean(BUILD_PATH);

const copyResult = copyPublicFolder(PUBLIC_PATH, BUILD_PATH);
if (!copyResult) {
  console.log(error("Cannot copy public folder - stopping build."));
  process.exit();
}

return new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    if (err) {
      console.log(error(err.message));
      return reject(err.message);
    }
    const time = stats.endTime - stats.startTime;
    let size = 0;
    stats.compilation.assetsInfo.forEach((asset) => {
      size += asset.size;
    });
    console.log(success("Built successfully at " + BUILD_PATH));
    console.log(success("Building took ") + primary(prettyTime(time)));
    console.log(success("Total bundle size: ") + primary(prettySize(size)));
  });
});
