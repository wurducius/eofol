const {
  ASSETS_BUILD_PATH,
  ASSETS_INNER_PATH,
  ASSETS_JS_PATH,
  ASSETS_CSS_PATH,
  ASSETS_SVG_PATH,
  ASSETS_IMG_PATH,
  ASSETS_FONT_PATH,
  ENTRYPOINT_ROOT_PATH,
} = require("./paths");
const {
  PORT,
  ASSET_SVG_INLINE_SIZE_LIMIT,
  ASSET_IMG_INLINE_SIZE_LIMIT,
} = require("./eofol");
const { collectViews } = require("@eofol/eofol-dev-utils");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const ChunksWebpackPlugin = require("chunks-webpack-plugin");

const entry = collectViews(ENTRYPOINT_ROOT_PATH);

const config = (mode, analyze) => {
  const isDev = !analyze && mode === "development";

  return {
    mode: isDev ? "development" : "production",
    entry,
    output: {
      filename: ASSETS_JS_PATH + "/[name].js",
      path: ASSETS_BUILD_PATH,
      publicPath: ASSETS_INNER_PATH,
      chunkFilename: isDev
        ? ASSETS_JS_PATH + "/[name].chunk.js"
        : ASSETS_JS_PATH + "/[name].[contenthash:8].chunk.js",
    },
    plugins: [
      analyze && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({ filename: ASSETS_CSS_PATH + "/[name].css" }),
      new ChunksWebpackPlugin({ generateChunksManifest: false }),
    ].filter(Boolean),
    optimization: {
      minimize: !isDev,
      minimizer: [
        !isDev && new TerserPlugin(),
        !isDev && new CssMinimizerPlugin(),
      ].filter(Boolean),
      splitChunks: {
        chunks: "all",
      },
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js|\.ts|\.tsx)$/i,
          use: {
            loader: "babel-loader",
          },
          exclude: /(node_modules)/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.svg$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: ASSET_SVG_INLINE_SIZE_LIMIT,
            },
          },
          generator: {
            filename: ASSETS_SVG_PATH + "/[hash][ext]",
          },
        },
        {
          test: /(\.png|\.jpeg|\.jpg|\.gif|\.webp|\.jfif)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: ASSET_IMG_INLINE_SIZE_LIMIT,
            },
          },
          generator: {
            filename: ASSETS_IMG_PATH + "/[hash][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: ASSETS_FONT_PATH + "/[hash][ext]",
          },
        },
        { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      ],
    },
    devServer: {
      port: PORT,
      compress: true,
      hot: true,
    },
    devtool: isDev && "source-map",
    stats: "errors-only",
    resolve: {
      extensions: [".css", ".json", ".js", ".ts", ".tsx", ".jsx"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
  };
};

module.exports = config;
