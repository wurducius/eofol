const createElementI = require("./src/core/create-element");

const defineCustomElementI = require("./src/core/custom-element");
const renderTargetI = require("./src/core/render-target");

const sxI = require("./src/styles/sx");

const registerServiceWorkerI = require("./src/util/service-worker");

const commonTypesI = require("./src/types/common-types");
const eofolTypesI = require("./src/types/eofol-types");

module.exports = {
  createElement: createElementI,

  defineCustomElement: defineCustomElementI,
  renderTarget: renderTargetI,

  sx: sxI,

  registerServiceWorker: registerServiceWorkerI,

  commonTypes: commonTypesI,
  eofolTypes: eofolTypesI,
};
