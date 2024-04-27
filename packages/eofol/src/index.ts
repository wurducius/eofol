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

import forceRerenderX from "./core/force-rerender";
export const forceRerender = forceRerenderX;

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

import createStyleX from "./styles/create-style";
export const createStyle = createStyleX.createStyle;
export const createStyleObj = createStyleX.createStyleObj;
export const clearStyle = createStyleX.clearStyle;

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

import cryptoX from "./util/crypto";
export const generateId = cryptoX.generateId;

import utilX from "./util/util";
export const mergeDeep = utilX.mergeDeep;

import breakpointX from "./runtime/breakpoint";
export const getBreakpoint = breakpointX.getBreakpoint;
export const mediaQueryMaxWidth = breakpointX.mediaQueryMaxWidth;

import translationX from "./runtime/translation";
export const t = translationX.t;
export const getLanguage = translationX.getLanguage;
export const setLanguage = translationX.setLanguage;
export const getLanguages = translationX.getLanguages;
export const initTranslation = translationX.initTranslation;

import themeX from "./styles/theme";
export const getTheme = themeX.getTheme;
export const setTheme = themeX.setTheme;
