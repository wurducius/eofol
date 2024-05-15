import { Theme } from "@eofol/eofol-types";

export const defaultTheme: Theme = {
  mode: "dark",
  color: {
    primary: "#03dac6",
    primaryLighter: "#35E1D1",
    primaryDarker: "#02AE9E",

    secondary: "#86b1ff",
    secondaryDarker: "#6B8DCC",
    secondaryLighter: "#9EC0FF",

    secondaryDark: "#6B8DCC",

    font: "#03dac6",

    background: "#121212",
    backgroundElevation: "#333333",
    backgroundModal: "#2d3748",

    error: "#fc8181",
  },
  typography: {
    default: { fontFamily: "sans-serif" },
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
