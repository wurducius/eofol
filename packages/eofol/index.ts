const createElementI = require("./src/core/create-element");

const defineCustomElementI = require("./src/core/custom-element");
const renderTargetI = require("./src/core/render-target");

const sxI = require("./src/styles/sx");

const registerServiceWorkerI = require("./src/runtime/service-worker");

export const createElement = createElementI;

export const defineCustomElement = defineCustomElementI.defineCustomElement;
export const updateCustom = defineCustomElementI.updateCustom;

export const renderTarget = renderTargetI.renderTarget;
export const updateTarget = renderTargetI.updateStateTarget;

export const sx = sxI;

export const registerServiceWorker = registerServiceWorkerI;
