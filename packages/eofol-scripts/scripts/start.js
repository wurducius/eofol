const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const { MODE, SERVE_URL } = require("../config/env-impl");
const { primary, success, getAppName } = require("@eofol/eofol-dev-utils");

const appName = getAppName();
const createConfig = require("../config/webpack.config");

console.log(primary("Starting the development server..."));
console.log(
  primary(`Serving eofol app ${appName} in ${MODE} mode at `) +
    success(SERVE_URL)
);

const config = createConfig();
const server = new WebpackDevServer(config.devServer, webpack(config));

const stopServer = async () => {
  await server.stop();
  process.exit();
};

const runServer = async () => {
  await server.start();
};

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, stopServer);
});

runServer();
