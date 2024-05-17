import { Theme } from "@eofol/eofol-types";

export const defaultTheme: Theme = {
  mode: "dark",
  color: {
    primary: {
      base: "#03dac6",
      light: "#35e1d1",
      dark: "#02ae9e",
    },
    secondary: { base: "#86b1ff", dark: "#6b8dcc", light: "#9ec0ff" },
    tertiary: { base: "#4caf50", dark: "#357a38", light: "#6fbf73" },
    background: {
      base: "#121212",
      elevation: "#333333",
      card: "#2d3748",
    },
    disabled: {
      base: "grey",
      light: "lightgrey",
      dark: "darkgrey",
    },
    font: "#03dac6",
    error: "#fc8181",
  },
  typography: {
    text: { fontSize: "16px" },
  },
  size: {
    sm: "24px",
    md: "32px",
    lg: "40px",
    xl: "48px",
    checkbox: {
      sm: "12px",
      md: "16px",
      lg: "20px",
      xl: "24px",
    },
  },
  spacing: {
    space1: "8px",
    space2: "16px",
    space3: "24px",
    space4: "32px",
    space5: "40px",
    space6: "48px",
    space7: "56px",
    space8: "64px",
    space9: "72px",
    space10: "80px",
  },
  shape: { borderRadius: "inherit" },
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 100,
    overlay: 150,
    modal: 200,
    notification: 250,
    tooltip: 300,
  },
  breakpoints: {
    values: [640, 1080, 1200, 1600, 2000, 2600],
    keys: ["xs", "sm", "md", "lg", "xl", "xxl"],
  },
  config: { direction: "ltr" },
  component: {},
};
