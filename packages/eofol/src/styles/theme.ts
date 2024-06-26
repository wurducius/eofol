import { Theme } from "@eofol/eofol-types";
import { defaultTheme } from "./default-theme";
import { mergeDeep } from "../util/merge-deep";
import { clearStyle, createStyleObj, createStyle } from "./create-style";
import { processColor } from "./color/process-color";
import { hideArrowsClassname, updateThemeStyles } from "./theme-styles";

const createTheme = (styles: Partial<Theme>) => {
  const parsedStyles = processColor(styles);
  return mergeDeep(defaultTheme, parsedStyles);
};

export let theme: Theme = createTheme(defaultTheme);

export const setTheme = (styles: Partial<Theme>) => {
  theme = createTheme(styles);
  setBaseStyles(theme);
  updateThemeStyles(theme);
};

const getTheme = () => theme;

const setBaseStyles = (theme: Theme) => {
  clearStyle();
  createStyleObj(
    { backgroundColor: theme.color.background.base, color: theme.color.font },
    "body"
  );
  createStyle(
    "@keyframes spinner-rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } "
  );
  createStyle(`.${hideArrowsClassname} { -moz-appearance: textfield; }`);
  createStyle(
    `.${hideArrowsClassname}::-webkit-outer-spin-button,
  .${hideArrowsClassname}::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } { -webkit-appearance: none; margin: 0; }`
  );
};

export default { getTheme, setTheme };
