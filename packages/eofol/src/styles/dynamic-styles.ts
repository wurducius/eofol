import { CSSObject } from "@eofol/eofol-types";
import { customElementRegistry } from "../core/registry";

const objectNotationToCSSNotation = (label: string) =>
  label
    .split("")
    .map((letter) =>
      letter.toUpperCase() === letter ? "-" + letter.toLowerCase() : letter
    )
    .join("");

export const injectStyle = (
  style: CSSObject,
  classname: string,
  styleCache: string[],
  excludeCustomElements?: boolean
) => {
  if (!styleCache.includes(classname)) {
    // @ts-ignore
    const cssStyle = Object.keys(style).reduce(
      (acc, next) =>
        acc +
        " " +
        objectNotationToCSSNotation(next) +
        ": " +
        // @ts-ignore
        objectNotationToCSSNotation(style[next]) +
        ";",
      ""
    );

    const last = document.styleSheets[document.styleSheets.length - 1];
    const rule = `.${classname} { ${cssStyle} }`;
    last.insertRule(rule);

    if (!excludeCustomElements) {
      Object.keys(customElementRegistry).forEach((id) => {
        const instance = customElementRegistry[id];
        const styleElement = instance.root?.querySelector("style");
        if (styleElement) {
          styleElement.innerHTML += " " + rule;
        }
      });
    }
  }

  return classname;
};
