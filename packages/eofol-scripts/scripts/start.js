const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const { primary } = require("eofol-dev-utils");

const createConfig = require("../config/webpack.config");

const args = process.argv.slice(2);
const isAnalyze = args.includes("analyze");

const config = createConfig("development", isAnalyze);
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
  console.log(primary("Starting the development server..."));
  await server.start();
};

runServer();
