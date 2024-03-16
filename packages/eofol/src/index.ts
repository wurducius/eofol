import createElementX from "./core/create-element";
export const createElement = createElementX;

import customElement from "./core/custom-element";
export const defineCustomElement = customElement.defineCustomElement;
export const updateCustom = customElement.updateCustom;

import target from "./core/render-target";
export const renderTarget = target.renderTarget;
export const updateTarget = target.updateTarget;

import store from "./store/store";
export const createStore = store.createStore;
export const select = store.select;
export const setStore = store.setStore;
export const mergeStore = store.mergeStore;

import sxX from "./styles/sx";
export const sx = sxX;

import serviceWorker from "./runtime/service-worker";
export const registerServiceWorker = serviceWorker;
