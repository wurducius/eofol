const {
  MODE,
  BROWSER,
  HTTPS,
  HOST,
  PORT,
  SHOW_PROGRESS,
  ANALYZE_BUNDLE,
  GENERATE_SOURCEMAP,
} = require("./env");

const isDev = MODE === "development";

const isHttps = HTTPS === "true" || HTTPS === true;

const getBrowser = (property) => {
  if (property === "false" || property === false) {
    return false;
  } else if (property === "true" || property === true) {
    return true;
  } else {
    return {
      app: {
        name: BROWSER,
      },
    };
  }
};

module.exports = {
  MODE: isDev ? "development" : "production",
  BROWSER: getBrowser(BROWSER),
  HTTPS: isHttps,
  SHOW_PROGRESS: SHOW_PROGRESS === "true" || SHOW_PROGRESS === true,
  ANALYZE_BUNDLE: ANALYZE_BUNDLE === "true" || ANALYZE_BUNDLE === true,
  GENERATE_SOURCEMAP:
    GENERATE_SOURCEMAP === "true" || GENERATE_SOURCEMAP === true,
  SERVE_URL: `${isHttps ? "https" : "http"}://${HOST}:${PORT}`,
  MINIMIZE: !isDev,
  TERSER: !isDev,
  CSS_MINIMIZE: !isDev,
};
