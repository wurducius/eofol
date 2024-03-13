import { customElementRegistry } from "../core/registry";

// source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash2_32_gc(str: string, seed: number) {
  var l = str.length,
    h = seed ^ l,
    i = 0,
    k;

  while (l >= 4) {
    k =
      (str.charCodeAt(i) & 0xff) |
      ((str.charCodeAt(++i) & 0xff) << 8) |
      ((str.charCodeAt(++i) & 0xff) << 16) |
      ((str.charCodeAt(++i) & 0xff) << 24);

    k =
      (k & 0xffff) * 0x5bd1e995 + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);
    k ^= k >>> 24;
    k =
      (k & 0xffff) * 0x5bd1e995 + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);

    h =
      ((h & 0xffff) * 0x5bd1e995 +
        ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^
      k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
        (h & 0xffff) * 0x5bd1e995 +
        ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
  h ^= h >>> 15;

  return h >>> 0;
}

// @TODO typing
type CSSObject = Record<string, string>;

const seed = new Date().getMilliseconds();

const styleCache: string[] = [];

const objectNotationToCSSNotation = (label: string) =>
  label
    .split("")
    .map((letter) =>
      letter.toUpperCase() === letter ? "-" + letter.toLowerCase() : letter
    )
    .join("");

function sx(style: CSSObject): string {
  const hash = "e" + murmurhash2_32_gc(JSON.stringify(style), seed).toString();
  if (!styleCache.includes(hash)) {
    // @ts-ignore
    const cssStyle = Object.keys(style).reduce(
      (acc, next) =>
        acc +
        " " +
        objectNotationToCSSNotation(next) +
        ": " +
        objectNotationToCSSNotation(style[next]) +
        ";",
      ""
    );
    const last = document.styleSheets[document.styleSheets.length - 1];
    const rule = `.${hash} { ${cssStyle} }`;
    last.insertRule(rule);
    Object.keys(customElementRegistry).forEach((id) => {
      const instance = customElementRegistry[id];
      const styleElement = instance.root?.querySelector("style");
      if (styleElement) {
        styleElement.innerHTML += " " + rule;
      }
    });
  }
  return hash;
}

module.exports = sx;
