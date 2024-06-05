const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { MODE, SERVE_URL } = require("../config/env-impl");
const { primary, success } = require("@eofol/eofol-dev-utils");

const createConfig = require("../config/webpack.config");

console.log(primary("Starting the development server..."));
console.log(
  primary(`Serving eofol app in ${MODE} mode at `) + success(SERVE_URL)
);

const config = createConfig();
const server = new WebpackDevServer(config.devServer, webpack(config));

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});

const runServer = async () => {
  await server.start();
};

runServer();
