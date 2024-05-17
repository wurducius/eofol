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
  checkboxSizeSm: "",
  checkboxSizeMd: "",
  checkboxSizeLg: "",
  checkboxSizeXl: "",
  inputDisabled: "",
  buttonBase: "",
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
      backgroundColor: theme.color.background.elevation,
      color: theme.color.secondary.base,
      fontFamily: "inherit",
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
      { outline: `2px solid ${theme.color.secondary.base}` },
      `:not(.${INPUT_INVALID}):focus`
    ),
    inputBorder: sx(
      { border: `1px solid ${theme.color.secondary.base}` },
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
    inputFocusFlat: sx({ outline: `2px solid ${theme.color.secondary.base}` }),
    checkboxSizeSm: sx({
      height: theme.size.checkbox.sm,
      width: theme.size.checkbox.sm,
    }),
    checkboxSizeMd: sx({
      height: theme.size.checkbox.md,
      width: theme.size.checkbox.md,
    }),
    checkboxSizeLg: sx({
      height: theme.size.checkbox.lg,
      width: theme.size.checkbox.lg,
    }),
    checkboxSizeXl: sx({
      height: theme.size.checkbox.xl,
      width: theme.size.checkbox.xl,
    }),
    inputDisabled: sx({
      cursor: "not-allowed",
      backgroundColor: "grey",
      color: "black",
      border: "1px solid darkgrey",
    }),
    buttonBase: sx({
      cursor: "pointer",
      padding: "0 16px",
      fontSize: theme.typography.text.fontSize,
      fontWeight: 500,
      fontFamily: "inherit",
    }),
  };
};

updateThemeStyles(defaultTheme);

export const getThemeStyles = () => themeStyles;

export default { getThemeStyles, updateThemeStyles, INPUT_INVALID };
