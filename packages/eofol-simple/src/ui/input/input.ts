import { InputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, cx, sx, getThemeStyles } from "@eofol/eofol";

export const input = (props: InputProps) => {
  const theme = getTheme();
  const themeStyles = getThemeStyles();

  const baseStyle = sx({
    zIndex: 0,
    cursor: "text",
    padding: "2px 10px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: theme.typography.text.fontSize,
    height: "24px",
    backgroundColor: theme.color.backgroundElevation,
    color: theme.color.secondary,
    border: `1px solid ${theme.color.secondary}`,
  });
  const baseTransitionStyle = themeStyles.inputBaseOutlineTransition;

  const focusStyle = themeStyles.inputFocus;
  const notFocusStyle = themeStyles.inputBaseOutline;
  const errorFocusStyle = themeStyles.inputErrorFocus;
  const borderStyle = themeStyles.inputBorder;
  const errorBorderStyle = themeStyles.inputErrorBorder;

  return inputBase({
    ...props,
    type: "text",
    classname: cx(
      baseStyle,
      baseTransitionStyle,
      notFocusStyle,
      focusStyle,
      errorFocusStyle,
      borderStyle,
      errorBorderStyle,
      props.classname
    ),
  });
};

export default { input };
