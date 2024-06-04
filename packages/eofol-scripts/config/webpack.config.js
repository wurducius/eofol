const {
  MODE,
  PORT,
  BROWSER,
  HOST,
  HTTPS,
  ANALYZE_BUNDLE,
  GENERATE_SOURCEMAP,
  ASSET_IMG_INLINE_SIZE_LIMIT,
  ASSET_SVG_INLINE_SIZE_LIMIT,
} = require("./env");
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
const webpack = require("webpack");
require("dotenv").config();

const { collectViews } = require("@eofol/eofol-dev-utils");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const ChunksWebpackPlugin = require("chunks-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const entry = collectViews(ENTRYPOINT_ROOT_PATH);

const isDev = MODE === "development";

const config = () => {
  return {
    mode: isDev ? "development" : "production",
    entry,
    output: {
      filename: ASSETS_JS_PATH + "/[name].js",
      path: ASSETS_BUILD_PATH,
      publicPath: ASSETS_INNER_PATH,
      /*
      chunkFilename: isDev
        ? ASSETS_JS_PATH + "/[name].chunk.js"
        : ASSETS_JS_PATH + "/[name].[contenthash:8].chunk.js",
        */
    },
    plugins: [
      ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({ filename: ASSETS_CSS_PATH + "/[name].css" }),
      // new ChunksWebpackPlugin({ generateChunksManifest: false }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ].filter(Boolean),
    optimization: {
      minimize: !isDev,
      minimizer: [
        !isDev && new TerserPlugin(),
        !isDev && new CssMinimizerPlugin(),
      ].filter(Boolean),
      //  splitChunks: {
      //    chunks: "all",
      //  },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
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
    devtool: GENERATE_SOURCEMAP && "source-map",
    stats: "errors-only",
    resolve: {
      extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".css", ".json", ".svg"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
  };
};

module.exports = config;
