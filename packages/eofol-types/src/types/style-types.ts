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

export type ConfigTheme = { direction: DirectionTheme };

export type ComponentTheme = {};

export type Theme = {
  mode: ModeTheme;
  color: Record<string, CSSString>;
  typography: Record<string | "default", TypographyTheme>;
  spacing: Record<string, CSSString>;
  size: Record<string, CSSValue>;
  zIndex: Record<string, CSSValue>;
  shape: ShapeTheme;
  breakpoints: BreakpointTheme;
  config: ConfigTheme;
  component: ComponentTheme;
};
