import { MultiOptional } from "../types/common-types";

export const appendChild = (parent: ParentNode) => (child: Element) => {
  parent.append(child);
};

export const removeChildren = (element: ParentNode, renderOffset?: number) => {
  const nodesToRemove = [];
  for (let c = 0 + (renderOffset ?? 0); c < element.childNodes.length; c++) {
    nodesToRemove.push(element.childNodes.item(c));
  }
  nodesToRemove.forEach((child) => {
    element.removeChild(child);
  });
};

export function arrayCombinator<T>(
  handler: (value: T) => void,
  data: MultiOptional<T>
) {
  if (data) {
    if (Array.isArray(data)) {
      data.forEach(handler);
    } else {
      handler(data);
    }
  }
}

export function generateId() {
  return crypto.randomUUID();
}

// source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
export function murmurhash2_32_gc(str: string, seed: number) {
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
