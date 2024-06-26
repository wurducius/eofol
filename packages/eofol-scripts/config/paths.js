const {
  BUILD_PATH,
  PUBLIC_PATH,
  SRC_PATH,
  ASSETS_PATH,
  ASSETS_JS_PATH,
  ASSETS_CSS_PATH,
  ASSETS_IMG_PATH,
  ASSETS_SVG_PATH,
  ASSETS_FONT_PATH,
  VIEWS_PATH,
} = require("./env");

const { resolve } = require("@eofol/eofol-dev-utils");

module.exports = {
  BUILD_PATH: resolve(BUILD_PATH),
  PUBLIC_PATH: resolve(PUBLIC_PATH),
  ENTRYPOINT_ROOT_PATH: resolve(SRC_PATH) + "/" + VIEWS_PATH + "/",
  ASSETS_BUILD_PATH: resolve(BUILD_PATH + "/" + ASSETS_PATH),
  ASSETS_INNER_PATH: "/" + ASSETS_PATH + "/",
  ASSETS_JS_PATH: ASSETS_JS_PATH,
  ASSETS_CSS_PATH: ASSETS_CSS_PATH,
  ASSETS_IMG_PATH: ASSETS_IMG_PATH,
  ASSETS_SVG_PATH: ASSETS_SVG_PATH,
  ASSETS_FONT_PATH: ASSETS_FONT_PATH,
};
