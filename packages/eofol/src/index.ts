// ----------------- CORE -----------------

import customElement from "./core/custom-element";
export const defineAutonomousElement = customElement.defineAutonomousElement;
export const defineBuiltinElement = customElement.defineBuiltinElement;
export const updateCustom = customElement.updateCustom;

import forceRerenderX from "./core/force-rerender";
export const forceRerender = forceRerenderX;

import renderElement from "./core/render-element";
export const createElement = renderElement.createElement;
export const createCustomElement = renderElement.createCustomElement;
export const e = renderElement.e;

import target from "./core/render-target";
export const renderTarget = target.renderTarget;
export const updateTarget = target.updateTarget;

// ----------------- STORE -----------------

import store from "./store/store";
export const createStore = store.createStore;
export const selector = store.selector;
export const setStore = store.setStore;
export const mergeStore = store.mergeStore;
export const createProjection = store.createProjection;
export const createSelector = store.createSelector;

// ----------------- STYLES -----------------

import createStyleX from "./styles/create-style";
export const createStyle = createStyleX.createStyle;
export const createStyleObj = createStyleX.createStyleObj;
export const clearStyle = createStyleX.clearStyle;

import sxX from "./styles/sx";
export const sx = sxX;

import syX from "./styles/sy";
export const sy = syX;

import themeX from "./styles/theme";
export const getTheme = themeX.getTheme;
export const setTheme = themeX.setTheme;

// ----------------- RUNTIME -----------------

import breakpointX from "./runtime/breakpoint";
export const getBreakpoint = breakpointX.getBreakpoint;
export const mediaQueryMaxWidth = breakpointX.mediaQueryMaxWidth;

import debounceX from "./runtime/debounce";
export const debounce = debounceX;

import fetchX from "./runtime/fetch";
export const get = fetchX.get;
export const post = fetchX.post;

import localStorageX from "./runtime/local-storage";
export const loadLocalStorage = localStorageX.loadLocalStorage;
export const saveLocalStorage = localStorageX.saveLocalStorage;
export const deleteLocalStorage = localStorageX.deleteLocalStorage;
export const clearLocalStorage = localStorageX.clearLocalStorage;

import serviceWorker from "./runtime/service-worker";
export const registerServiceWorker = serviceWorker;

import translationX from "./runtime/translation";
export const t = translationX.t;
export const getLanguage = translationX.getLanguage;
export const setLanguage = translationX.setLanguage;
export const getLanguages = translationX.getLanguages;
export const initTranslation = translationX.initTranslation;

// ----------------- UTIL -----------------

import simpleUtils from "./util/simple";
export const ax = simpleUtils.ax;
export const cx = simpleUtils.cx;
export const addCx = simpleUtils.addCx;
export const removeCx = simpleUtils.removeCx;

import cryptoX from "./util/crypto";
export const generateId = cryptoX.generateId;

import mergeDeepX from "./util/merge-deep";
export const mergeDeep = mergeDeepX.mergeDeep;
