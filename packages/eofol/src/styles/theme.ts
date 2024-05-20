import { Theme } from "@eofol/eofol-types";
import { defaultTheme } from "./default-theme";
import { mergeDeep } from "../util/merge-deep";
import { clearStyle, createStyleObj } from "./create-style";

const createTheme = (styles: Partial<Theme>) => mergeDeep(defaultTheme, styles);

export let theme: Theme = createTheme({});

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
