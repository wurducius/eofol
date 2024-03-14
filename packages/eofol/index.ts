import createElementI from "./src/core/create-element";

import defineCustomElementI from "./src/core/custom-element";
import renderTargetI from "./src/core/render-target";

import storeI from "./src/store/store";

import sxI from "./src/styles/sx";

import registerServiceWorkerI from "./src/runtime/service-worker";

export const createElement = createElementI;

export const defineCustomElement = defineCustomElementI.defineCustomElement;
export const updateCustom = defineCustomElementI.updateCustom;

export const renderTarget = renderTargetI.renderTarget;
export const updateTarget = renderTargetI.updateTarget;

export const createStore = storeI.createStore;
export const select = storeI.select;
export const setStore = storeI.setStore;
export const mergeStore = storeI.mergeStore;

export const sx = sxI;

export const registerServiceWorker = registerServiceWorkerI;
