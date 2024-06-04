import {
  forceRerender,
  loadLocalStorage,
  mergeDeep,
  saveLocalStorage,
  setTheme,
} from "@eofol/eofol";
import { LOCAL_STORAGE_NAME } from "../data";

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

export const darkTheme = mergeDeep(commonTheme, {
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

export const lightTheme = mergeDeep(commonTheme, {
  color: {
    primary: {
      base: "#166abd",
    },
    secondary: {
      base: "#9c27b0",
    },
    tertiary: {
      base: "#bb86fc",
    },
    background: {
      base: "#ffffff",
      elevation: "#e6e6e6",
      card: "#d4d4d4",
    },
    font: "black",
    error: "#fc8181",
  },
});

const storage = loadLocalStorage(LOCAL_STORAGE_NAME);
// @ts-ignore
const storageTheme = storage?.theme;

let themeState = storageTheme === "light" ? "light" : "dark";

setTheme(themeState === "light" ? lightTheme : darkTheme);

if (!storage || storageTheme !== themeState) {
  saveLocalStorage({ theme: themeState }, LOCAL_STORAGE_NAME);
}

export const getThemeState = () => themeState;

export const toggleTheme = () => {
  themeState = themeState === "dark" ? "light" : "dark";
  const theme = themeState === "dark" ? darkTheme : lightTheme;
  saveLocalStorage({ theme: themeState }, LOCAL_STORAGE_NAME);
  setTheme(theme);
  forceRerender();
};
