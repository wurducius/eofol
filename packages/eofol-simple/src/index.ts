// ----------------- TYPOGRAPHY -----------------

import typography from "./typography";
export const h1 = typography.h1;
export const h2 = typography.h2;
export const h3 = typography.h3;
export const h4 = typography.h4;
export const h5 = typography.h5;
export const h6 = typography.h6;
export const p = typography.p;
export const code = typography.code;
export const pre = typography.pre;
export const kbd = typography.kbd;
export const blockquote = typography.blockquote;
export const abbr = typography.abbr;
export const small = typography.small;
export const strong = typography.strong;
export const em = typography.em;
export const del = typography.del;
export const ins = typography.ins;
export const sub = typography.sub;
export const sup = typography.sup;
export const address = typography.address;

// ----------------- PRIMITIVE -----------------

import primitiveX from "./primitive";
export const center = primitiveX.center;
export const container = primitiveX.container;
export const div = primitiveX.div;
export const flex = primitiveX.flex;

// ------------------ SEMANTIC ------------------

import semanticX from "./semantic";
export const Semantic = semanticX.Semantic;

// ----------------- COMPONENTS -----------------

import aX from "./ui/a";
export const a = aX.a;
export const linkButton = aX.linkButton;
export const aBase = aX.aBase;

import bubbleX from "./ui/bubble";
export const bubble = bubbleX.bubble;

import buttonX from "./ui/button";
export const button = buttonX.button;
export const iconButton = buttonX.iconButton;

import checkboxX from "./ui/checkbox";
export const checkbox = checkboxX.checkbox;

import dividerX from "./ui/divider";
export const divider = dividerX.divider;

import dropdownX from "./ui/dropdown";
export const dropdown = dropdownX.dropdown;
export const dropdownContent = dropdownX.dropdownContent;

import imgX from "./ui/img";
export const img = imgX.img;

import inputX from "./ui/input";
export const input = inputX.input;

import inputBaseX from "./ui/input-base";
export const inputBase = inputBaseX.inputBase;

import listX from "./ui/list";
export const orderedList = listX.orderedList;
export const unorderedList = listX.unorderedList;
export const orderedListTag = listX.orderedListTag;
export const unorderedListTag = listX.unorderedListTag;
export const listItemTag = listX.listItemTag;

import modalX from "./ui/modal";
export const modal = modalX.modal;

import notificationX from "./ui/notification";
export const notify = notificationX.notify;

import numberInputX from "./ui/number-input";
export const numberInput = numberInputX.numberInput;

import selectX from "./ui/select";
export const select = selectX.select;

import sliderInputX from "./ui/slider-input";
export const sliderInput = sliderInputX.sliderInput;

import spinnerX from "./ui/spinner";
export const spinner = spinnerX.spinner;

import textareaX from "./ui/textarea";
export const textarea = textareaX.textarea;

import tooltipX from "./ui/tooltip";
export const tooltip = tooltipX.tooltip;

// ----------------- CUSTOM -----------------

import customX from "./custom";
export const defineAccordion = customX.defineAccordion;
export const defineCollapse = customX.defineCollapse;
export const defineInfiniteScroll = customX.defineInfiniteScroll;
export const defineSelectSearch = customX.defineSelectSearch;
export const defineTabs = customX.defineTabs;

// ----------------- UTIL -----------------

import validationX from "./util";
export const validateIsInteger = validationX.validateIsInteger;
export const validateIsNumber = validationX.validateIsNumber;
export const validateIsOverMin = validationX.validateIsOverMin;
export const validateIsPositive = validationX.validateIsPositive;
export const validateIsRequired = validationX.validateIsRequired;
export const validateIsStrictlyOverMin = validationX.validateIsStrictlyOverMin;
export const validateIsUnderMax = validationX.validateIsUnderMax;
export const integerValidation = validationX.integerValidation;
export const decimalValidation = validationX.decimalValidation;
export const decimalPositiveValidation = validationX.decimalPositiveValidation;
