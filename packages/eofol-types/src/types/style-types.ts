import type * as CSS from "csstype";

export type CSSObject = CSS.Properties;

export type Theme = {
  color: Record<string, string>;
  typography: Record<string, { fontSize: string }>;
  spacing: Record<string, string>;
  breakpoints: {
    values: number[];
    keys: string[];
  };
};
