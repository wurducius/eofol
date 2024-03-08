const fs = require("fs");
const { error } = require("./chalk");

const resolveViewJS = (entrypointRootPath, name) =>
  entrypointRootPath + "/" + name + "/" + name + ".js";
const resolveViewTS = (entrypointRootPath, name) =>
  entrypointRootPath + "/" + name + "/" + name + ".ts";

const collectView = (entrypointRootPath) => (acc, next) => {
  if (fs.existsSync(resolveViewTS(entrypointRootPath, next))) {
    return {
      ...acc,
      [next]: resolveViewTS(entrypointRootPath, next),
    };
  } else if (fs.existsSync(resolveViewJS(entrypointRootPath, next))) {
    return {
      ...acc,
      [next]: resolveViewJS(entrypointRootPath, next),
    };
  } else {
    return acc;
  }
};

function collectViews(entrypointRootPath) {
  try {
    return fs
      .readdirSync(entrypointRootPath)
      .reduce(collectView(entrypointRootPath), {});
  } catch (e) {
    console.log(
      error(`Error collecting views from project at ${entrypointRootPath}`)
    );
  }
}

module.exports = collectViews;
