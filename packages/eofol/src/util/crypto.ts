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
      (str.charCodeAt(i) & 255) |
      ((str.charCodeAt(++i) & 255) << 8) |
      ((str.charCodeAt(++i) & 255) << 16) |
      ((str.charCodeAt(++i) & 255) << 24);

    k = (k & 65535) * 1540483477 + ((((k >>> 16) * 1540483477) & 65535) << 16);
    k ^= k >>> 24;
    k = (k & 65535) * 1540483477 + ((((k >>> 16) * 1540483477) & 65535) << 16);

    h =
      ((h & 65535) * 1540483477 + ((((h >>> 16) * 1540483477) & 65535) << 16)) ^
      k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h =
        (h & 65535) * 1540483477 + ((((h >>> 16) * 1540483477) & 65535) << 16);
  }

  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((((h >>> 16) * 1540483477) & 65535) << 16);
  h ^= h >>> 15;

  return h >>> 0;
}

export default { generateId };
