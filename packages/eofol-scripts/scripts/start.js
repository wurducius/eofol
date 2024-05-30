const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const { primary } = require("@eofol/eofol-dev-utils");

const createConfig = require("../config/webpack.config");

console.log(primary("Starting the development server..."));

const config = createConfig();
const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: true };

const server = new WebpackDevServer(devServerOptions, compiler);

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
