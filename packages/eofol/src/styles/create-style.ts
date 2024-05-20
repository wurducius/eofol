import { CSSObject } from "@eofol/eofol-types";
import { objectNotationToCSSNotation } from "./dynamic-styles";

const THEME_STYLE_ELEMENT_ID = "theme-styles";

let themeStyleElement: Element | null = null;

const injectStyleX = (rule: string) => {
  if (!themeStyleElement) {
    themeStyleElement = document.getElementById(THEME_STYLE_ELEMENT_ID);
  }
  if (themeStyleElement) {
    themeStyleElement.innerHTML = themeStyleElement.innerHTML + " " + rule;
  }
};

export const createStyle = (rule: string) => {
  injectStyleX(rule);
};

export const clearStyle = () => {
  if (themeStyleElement) {
    document.head.removeChild(themeStyleElement);
  }
  const nextStyleElement = document.createElement("style");
  nextStyleElement.id = THEME_STYLE_ELEMENT_ID;
  document.head.insertAdjacentElement("afterbegin", nextStyleElement);
  themeStyleElement = nextStyleElement;
};

export const createStyleObj = (style: CSSObject, classname: string) => {
  // @ts-ignore
  const rule = Object.keys(style).reduce(
    (acc, next) =>
      acc +
      " " +
      objectNotationToCSSNotation(next) +
      ": " +
      // @ts-ignore
      style[next] +
      ";",
    ""
  );
  injectStyleX(`${classname} { ${rule} }`);
};

export default { createStyle, createStyleObj, clearStyle };
