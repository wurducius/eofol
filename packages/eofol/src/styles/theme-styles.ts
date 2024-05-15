import { Theme } from "@eofol/eofol-types";
import sx from "./sx";
import { defaultTheme } from "./default-theme";

export const INPUT_INVALID = "input-invalid";

let themeStyles = {
  inputBaseOutlineTransition: "",
  inputBaseOutline: "",
  inputBorder: "",
  inputFocus: "",
  inputErrorFocus: "",
  inputErrorBorder: "",
  inputErrorFocusFlat: "",
  inputErrorBorderFlat: "",
  inputFocusFlat: "",
};

export const updateThemeStyles = (theme: Theme) => {
  themeStyles = {
    inputBaseOutlineTransition: sx({
      transition: `outline 200ms linear`,
    }),
    inputBaseOutline: sx(
      {
        outline: `2px solid transparent`,
      },
      ":not(:focus)"
    ),
    inputFocus: sx(
      { outline: `2px solid ${theme.color.secondary}` },
      `:not(.${INPUT_INVALID}):focus`
    ),
    inputBorder: sx(
      { border: `1px solid ${theme.color.secondary}` },
      `:not(.${INPUT_INVALID})`
    ),
    inputErrorFocus: sx(
      { outline: `2px solid ${theme.color.error}` },
      `.${INPUT_INVALID}:focus`
    ),
    inputErrorBorder: sx(
      { border: `1px solid ${theme.color.error}` },
      `.${INPUT_INVALID}`
    ),
    inputErrorFocusFlat: sx({ outline: `2px solid ${theme.color.error}` }),
    inputErrorBorderFlat: sx({ border: `1px solid ${theme.color.error}` }),
    inputFocusFlat: sx({ outline: `2px solid ${theme.color.secondary}` }),
  };
};

updateThemeStyles(defaultTheme);

export const getThemeStyles = () => themeStyles;

export default { getThemeStyles, updateThemeStyles, INPUT_INVALID };
