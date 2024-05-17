import type * as CSS from "csstype";

export type CSSObject = CSS.Properties;

export type CSSValue = string | number;

export type CSSString = string;

export type ModeTheme = "dark" | "light";

export type DirectionTheme = "ltr" | "rtl";

export type TypographyTheme = {
  fontSize?: CSSString;
  fontWeight?: CSSValue;
  fontFamily?: CSSString;
  lineHeight?: CSSString;
  letterSpacing?: CSSString;
};

export type ShapeTheme = {
  borderRadius?: CSSString;
};

export type BreakpointTheme = {
  values: number[];
  keys: string[];
};

export type ColorSchemePalette = {
  base: CSSString;
  dark: CSSString;
  light: CSSString;
};

export type ColorTheme = {
  primary: ColorSchemePalette;
  secondary: ColorSchemePalette;
  tertiary: ColorSchemePalette;
  background: { base: CSSString; elevation: CSSString; card: CSSString };
  font: CSSString;
  error: CSSString;
};

export type ConfigTheme = { direction: DirectionTheme };

export type ComponentTheme = {};

export type Theme = {
  mode: ModeTheme;
  color: ColorTheme;
  typography: Record<string | "default", TypographyTheme>;
  spacing: Record<string, CSSString>;
  size: {
    sm: CSSString;
    md: CSSString;
    lg: CSSString;
    xl: CSSString;
    checkbox: Record<string, CSSString>;
  };
  zIndex: Record<string, CSSValue>;
  shape: ShapeTheme;
  breakpoints: BreakpointTheme;
  config: ConfigTheme;
  component: ComponentTheme;
};

export type ColorScheme = "primary" | "secondary" | "tertiary" | undefined;
