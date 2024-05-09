// ----------------- TYPOGRAPHY -----------------

import typography from "./ui/typography/typography";
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
export const mark = typography.mark;
export const em = typography.em;
export const del = typography.del;
export const ins = typography.ins;
export const sub = typography.sub;
export const sup = typography.sup;
export const address = typography.address;

// ----------------- PRIMITIVE -----------------

import primitiveX from "./ui/primitive";
export const center = primitiveX.center;
export const div = primitiveX.div;
export const flex = primitiveX.flex;

// ----------------- COMPONENTS -----------------

import aX from "./ui/link/link";
export const a = aX;

import buttonX from "./ui/button/button";
export const button = buttonX;

import bubbleX from "./ui/bubble/bubble";
export const bubble = bubbleX.bubble;

import checkboxX from "./ui/checkbox/checkbox";
export const checkbox = checkboxX;

import dividerX from "./ui/divider/divider";
export const divider = dividerX;

import dropdownX from "./ui/dropdown/dropdown";
export const dropdown = dropdownX.dropdown;
export const dropdownContent = dropdownX.dropdownContent;

import iconButtonX from "./ui/icon-button/icon-button";
export const iconButton = iconButtonX;

import inputX from "./ui/input/input";
export const input = inputX.input;

import inputBaseX from "./ui/input-base/input-base";
export const inputBase = inputBaseX.inputBase;

import listX from "./ui/list/list";
export const orderedList = listX.orderedList;
export const unorderedList = listX.unorderedList;

import modalX from "./ui/modal/modal";
export const modal = modalX;

import notifyX from "./ui/notification/notification";
export const notify = notifyX;

import numberInputX from "./ui/number-input/number-input";
export const numberInput = numberInputX.numberInput;

import selectX from "./ui/select/select";
export const select = selectX;

import sliderInputX from "./ui/slider-input/slider-input";
export const sliderInput = sliderInputX.sliderInput;

import spinnerX from "./ui/spinner/spinner";
export const spinner = spinnerX;

import textareaX from "./ui/textarea/textarea";
export const textarea = textareaX.textarea;

import tooltipX from "./ui/tooltip/tooltip";
export const tooltip = tooltipX;

// ----------------- CUSTOM -----------------

import defineAccordionX from "./custom/accordion/accordion";
export const defineAccordion = defineAccordionX;

import defineCollapseX from "./custom/collapse/collapse";
export const defineCollapse = defineCollapseX;

import infiniteScrollX from "./custom/infinite-scroll/infinite-scroll";
export const defineInfiniteScroll = infiniteScrollX;

import selectSearchX from "./ui/select-search/select-search";
export const defineSelectSearch = selectSearchX.defineSelectSearch;

import defineTabsX from "./custom/tabs/tabs";
export const defineTabs = defineTabsX;

// ----------------- UTIL -----------------

import validationX from "./util/validation";
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
