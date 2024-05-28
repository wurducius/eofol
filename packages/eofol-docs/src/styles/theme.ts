import { mergeDeep } from "@eofol/eofol";

const commonTheme = {
  typography: {
    text: {
      fontSize: "16px",
    },
    title: {
      fontSize: "20px",
    },
    heading: {
      fontSize: "24px",
    },
    tableSmall: {
      fontSize: "12px",
    },
  },
  shape: { borderRadius: "8px" },
  breakpoints: { values: [640, 1080, 1200, 1600, 2000, 2600] },
};

export const cyanTheme = mergeDeep(commonTheme, {
  color: {
    primary: {
      base: "#03dac6",
    },
    secondary: {
      base: "#86b1ff",
    },
    tertiary: {
      base: "#bb86fc",
    },
    background: {
      base: "#121212",
      elevation: "#333333",
      card: "#2d3748",
    },
    font: "#03dac6",
    error: "#fc8181",
  },
});
