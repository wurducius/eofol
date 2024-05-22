import { Theme } from "@eofol/eofol-types";
import { defaultTheme } from "./default-theme";
import { mergeDeep } from "../util/merge-deep";
import { clearStyle, createStyleObj } from "./create-style";
import { processColor } from "./color/process-color";

const createTheme = (styles: Partial<Theme>) => {
  const parsedStyles = processColor(styles);
  return mergeDeep(defaultTheme, parsedStyles);
};

export let theme: Theme = createTheme(defaultTheme);

export const setTheme = (styles: Partial<Theme>) => {
  theme = createTheme(styles);
  setBaseStyles(theme);
};

const getTheme = () => theme;

const setBaseStyles = (theme: Theme) => {
  clearStyle();
  createStyleObj(
    { backgroundColor: theme.color.background.base, color: theme.color.font },
    "body"
  );
};

export default { getTheme, setTheme };
