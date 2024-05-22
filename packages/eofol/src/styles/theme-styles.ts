import { Theme } from "@eofol/eofol-types";
import sx from "./sx";

export const INPUT_INVALID = "input-invalid";

const emptyScheme = {
  primary: "",
  secondary: "",
  tertiary: "",
};

let themeStyles = {
  color: emptyScheme,
  backgroundColor: emptyScheme,
  border: emptyScheme,
  inputBase: "",
  inputBaseOutlineTransition: "",
  inputBaseOutline: "",
  inputBorder: emptyScheme,
  inputFocus: emptyScheme,
  inputErrorFocus: "",
  inputErrorBorder: "",
  inputErrorFocusFlat: "",
  inputErrorBorderFlat: "",
  inputFocusFlat: emptyScheme,
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
    color: {
      primary: sx({ color: theme.color.primary.base }),
      secondary: sx({ color: theme.color.secondary.base }),
      tertiary: sx({ color: theme.color.tertiary.base }),
    },
    backgroundColor: {
      primary: sx({ backgroundColor: theme.color.primary.base }),
      secondary: sx({ backgroundColor: theme.color.secondary.base }),
      tertiary: sx({ backgroundColor: theme.color.tertiary.base }),
    },
    border: {
      primary: sx({ color: theme.color.primary.dark }),
      secondary: sx({ color: theme.color.secondary.dark }),
      tertiary: sx({ color: theme.color.tertiary.dark }),
    },
    inputBase: sx({
      zIndex: 0,
      cursor: "text",
      padding: "2px 10px",
      marginTop: "8px",
      marginBottom: "8px",
      fontSize: theme.typography.text.fontSize,
      backgroundColor: theme.color.background.elevation,
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
    inputFocus: {
      primary: sx(
        { outline: `2px solid ${theme.color.primary.base}` },
        `:not(.${INPUT_INVALID}):focus`
      ),
      secondary: sx(
        { outline: `2px solid ${theme.color.secondary.base}` },
        `:not(.${INPUT_INVALID}):focus`
      ),
      tertiary: sx(
        { outline: `2px solid ${theme.color.tertiary.base}` },
        `:not(.${INPUT_INVALID}):focus`
      ),
    },
    inputBorder: {
      primary: sx(
        { border: `1px solid ${theme.color.primary.base}` },
        `:not(.${INPUT_INVALID})`
      ),
      secondary: sx(
        { border: `1px solid ${theme.color.secondary.base}` },
        `:not(.${INPUT_INVALID})`
      ),
      tertiary: sx(
        { border: `1px solid ${theme.color.tertiary.base}` },
        `:not(.${INPUT_INVALID})`
      ),
    },
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
    inputFocusFlat: {
      primary: sx({ outline: `2px solid ${theme.color.primary.base}` }),
      secondary: sx({ outline: `2px solid ${theme.color.secondary.base}` }),
      tertiary: sx({ outline: `2px solid ${theme.color.tertiary.base}` }),
    },
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
      backgroundColor: theme.color.disabled.base,
      color: "black",
      border: `1px solid ${theme.color.disabled.dark}`,
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

// updateThemeStyles(defaultTheme);

export const getThemeStyles = () => themeStyles;

export default { getThemeStyles, updateThemeStyles, INPUT_INVALID };
