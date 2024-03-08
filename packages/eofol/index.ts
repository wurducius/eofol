const createElementI = require("./src/create-element");
const registerServiceWorkerI = require("./src/service-worker");
const defineCustomElementI = require("./src/custom-element");
const renderTargetI = require("./src/render-target");
const sxI = require("./src/sx");

const commonTypesI = require("./src/common-types");
const eofolTypesI = require("./src/eofol-types");

module.exports = {
  createElement: createElementI,
  registerServiceWorker: registerServiceWorkerI,
  defineCustomElement: defineCustomElementI,
  renderTarget: renderTargetI,
  sx: sxI,

  commonTypes: commonTypesI,
  eofolTypes: eofolTypesI,
};
