const createElementI = require("./src/core/create-element");

const defineCustomElementI = require("./src/core/custom-element");
const renderTargetI = require("./src/core/render-target");

const sxI = require("./src/styles/sx");

const registerServiceWorkerI = require("./src/runtime/service-worker");

module.exports = {
  createElement: createElementI,

  defineCustomElement: defineCustomElementI.defineCustomElement,
  updateCustom: defineCustomElementI.updateCustom,

  renderTarget: renderTargetI.renderTarget,
  updateTarget: renderTargetI.updateStateTarget,

  sx: sxI,

  registerServiceWorker: registerServiceWorkerI,
};
