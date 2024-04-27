import { Theme } from "@eofol/eofol-types";
import { defaultTheme } from "./default-theme";
import { mergeDeep } from "../util/util";

const createTheme = (styles: Partial<Theme>) => mergeDeep(defaultTheme, styles);

export let theme: Theme = createTheme({});

export const setTheme = (styles: Partial<Theme>) => {
  theme = createTheme(styles);
};

const getTheme = () => theme;

export default { getTheme, setTheme };
