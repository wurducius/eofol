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
export const selectStore = store.select;
export const setStore = store.setStore;
export const mergeStore = store.mergeStore;

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

import typography from "./ui/simple/typography/typography";
export const h1 = typography.h1;
export const h2 = typography.h2;
export const h3 = typography.h3;
export const h4 = typography.h4;
export const h5 = typography.h5;
export const h6 = typography.h6;
export const p = typography.p;
export const code = typography.code;

import aX from "./ui/simple/link/link";
export const a = aX;

import buttonX from "./ui/simple/button/button";
export const button = buttonX;

import checkboxX from "./ui/simple/checkbox/checkbox";
export const checkbox = checkboxX;

import selectX from "./ui/simple/select/select";
export const select = selectX;
