import { Theme } from "@eofol/eofol-types";
import { hexToRgb, rgbToHex } from "./rgb-hex";
import rgbToHsl from "./rgb-to-hsl";
import hslToRgb from "./hsl-to-rgb";

const COLOR_OFFSET = 0.15;

const processColorScheme = (
  styles: Partial<Theme>,
  scheme: "primary" | "secondary" | "tertiary"
) => {
  // @ts-ignore
  if (!styles.color[scheme] || !styles.color[scheme].base) {
    return styles;
  }
  // @ts-ignore
  const schemeColor = styles.color[scheme].base; // @ts-ignore
  const schemeDark = styles.color[scheme].dark; // @ts-ignore
  const schemeLight = styles.color[scheme].light;

  const rgb = hexToRgb(schemeColor.substring(1));
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

  // @ts-ignore
  if (styles.color[scheme] && schemeColor && !schemeDark) {
    // @ts-ignore
    const darkerHsl = [hsl[0], hsl[1], Math.max(0, hsl[2] - COLOR_OFFSET)]; // @ts-ignore
    const backRgb = hslToRgb(darkerHsl[0], darkerHsl[1], darkerHsl[2]);
    const backHex = rgbToHex(backRgb[0], backRgb[1], backRgb[2]);
    // @ts-ignore
    styles.color[scheme].dark = `#${backHex[0]}${backHex[1]}${backHex[2]}`;
  }

  // @ts-ignore
  if (styles.color[scheme] && schemeColor && !schemeLight) {
    // @ts-ignore
    const lighterHsl = [hsl[0], hsl[1], Math.min(1, hsl[2] + COLOR_OFFSET)];
    // @ts-ignore
    const backRgb = hslToRgb(lighterHsl[0], lighterHsl[1], lighterHsl[2]);
    const backHex = rgbToHex(backRgb[0], backRgb[1], backRgb[2]);
    // @ts-ignore
    styles.color[scheme].light = `#${backHex[0]}${backHex[1]}${backHex[2]}`;
  }

  return styles;
};

export const processColor = (styles: Partial<Theme>) => {
  const stylesPrimary = processColorScheme(styles, "primary");
  const stylesSecondary = processColorScheme(stylesPrimary, "secondary");
  const stylesTertiary = processColorScheme(stylesSecondary, "tertiary");
  return stylesTertiary;
};
