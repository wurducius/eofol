import { CSSObject } from "@eofol/eofol-types";
import { customElementRegistry } from "../core/registry";
import { murmurhash2_32_gc } from "../util/crypto";

const seed = new Date().getMilliseconds();

const styleCache: string[] = [];

const objectNotationToCSSNotation = (label: string) =>
  label
    .split("")
    .map((letter) =>
      letter.toUpperCase() === letter ? "-" + letter.toLowerCase() : letter
    )
    .join("");

function sx(style: CSSObject, excludeCustomElements?: boolean): string {
  const hash = "e" + murmurhash2_32_gc(JSON.stringify(style), seed).toString();

  if (!styleCache.includes(hash)) {
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
    const rule = `.${hash} { ${cssStyle} }`;
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
  return hash;
}

export default sx;
