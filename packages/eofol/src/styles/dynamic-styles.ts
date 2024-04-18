import { CSSObject } from "@eofol/eofol-types";
import { customElementRegistry } from "../core/registry";

const getFullClassname = (classname: string) => {
  if (classname.startsWith("#")) {
    return classname;
  } else if (classname.startsWith("<") && classname.endsWith(">")) {
    return classname.substring(1, classname.length - 1);
  } else {
    return `.${classname}`;
  }
};

const getFullClassnameWithPseudoSelector = (
  classname: string,
  pseudoSelector?: string
) => (pseudoSelector ? `${classname}:${pseudoSelector}` : classname);

const objectNotationToCSSNotation = (label: string) =>
  label
    .split("")
    .map((letter) =>
      letter.toUpperCase() === letter ? "-" + letter.toLowerCase() : letter
    )
    .join("");

export const injectCSS = (css: string) => {
  const last = document.styleSheets[document.styleSheets.length - 1];
  last.insertRule(css);
};

export const injectStyle = (
  style: CSSObject,
  classname: string,
  styleCache: string[],
  pseudoSelector?: string,
  forceInject?: boolean
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
        style[next] +
        ";",
      ""
    );

    injectCSS(
      `${getFullClassnameWithPseudoSelector(
        getFullClassname(classname),
        pseudoSelector
      )} {${cssStyle} }`
    );

    styleCache.push(classname);
  }

  if (forceInject) {
    const cssStyle = Object.keys(style).reduce(
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
    const rule = `${getFullClassnameWithPseudoSelector(
      getFullClassname(classname),
      pseudoSelector
    )} {${cssStyle} }`;

    Object.keys(customElementRegistry).forEach((id) => {
      const instance = customElementRegistry[id];
      const styleElement = instance.root?.querySelector("style");
      if (styleElement) {
        styleElement.innerHTML += " " + rule;
      }
    });
  }

  return classname;
};
