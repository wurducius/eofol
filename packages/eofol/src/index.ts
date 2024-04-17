import renderElement from "./core/render-element";
export const createElement = renderElement.createElement;
export const createCustomElement = renderElement.createCustomElement;
export const e = renderElement.e;

import customElement from "./core/custom-element";
export const defineAutonomousElement = customElement.defineAutonomousElement;
export const defineBuiltinElement = customElement.defineBuiltinElement;
export const updateCustom = customElement.updateCustom;

import target from "./core/render-target";
export const renderTarget = target.renderTarget;
export const updateTarget = target.updateTarget;

import store from "./store/store";
export const createStore = store.createStore;
export const selector = store.selector;
export const setStore = store.setStore;
export const mergeStore = store.mergeStore;
export const createProjection = store.createProjection;
export const createSelector = store.createSelector;

import sxX from "./styles/sx";
export const sx = sxX;

import syX from "./styles/sy";
export const sy = syX;

import serviceWorker from "./runtime/service-worker";
export const registerServiceWorker = serviceWorker;

import fetchX from "./runtime/fetch";
export const get = fetchX.get;
export const post = fetchX.post;

import debounceX from "./runtime/debounce";
export const debounce = debounceX;

import simpleUtils from "./util/simple";
export const ax = simpleUtils.ax;
export const cx = simpleUtils.cx;
