import { Theme } from "@eofol/eofol-types";
import sx from "./sx";
import { defaultTheme } from "./default-theme";

export const INPUT_INVALID = "input-invalid";

let themeStyles = {
  inputBase: "",
  inputBaseOutlineTransition: "",
  inputBaseOutline: "",
  inputBorder: "",
  inputFocus: "",
  inputErrorFocus: "",
  inputErrorBorder: "",
  inputErrorFocusFlat: "",
  inputErrorBorderFlat: "",
  inputFocusFlat: "",
  inputSizeSm: "",
  inputSizeMd: "",
  inputSizeLg: "",
  inputSizeXl: "",
};

export const updateThemeStyles = (theme: Theme) => {
  themeStyles = {
    inputBase: sx({
      zIndex: 0,
      cursor: "text",
      padding: "2px 10px",
      marginTop: "8px",
      marginBottom: "8px",
      fontSize: theme.typography.text.fontSize,
      backgroundColor: theme.color.backgroundElevation,
      color: theme.color.secondary,
    }),
    inputSizeSm: sx({
      height: theme.size.sm,
    }),
    inputSizeMd: sx({
      height: theme.size.md,
    }),
    inputSizeLg: sx({
      height: theme.size.lg,
    }),
    inputSizeXl: sx({
      height: theme.size.xl,
    }),
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
