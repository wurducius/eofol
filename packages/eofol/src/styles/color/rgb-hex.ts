const convertRgbHex = (rgbVal: number) => {
  var hex = rgbVal.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return [convertRgbHex(r), convertRgbHex(g), convertRgbHex(b)];
};

export const hexToRgb = (hex: string) => {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return [r, g, b];
};
