import { InputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { cx, getThemeStyles } from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";

export const input = (props: InputProps) => {
  const themeStyles = getThemeStyles();

  const baseStyle = themeStyles.inputBase;
  const baseTransitionStyle = themeStyles.inputBaseOutlineTransition;
  const sizeStyle = getInputSizeStyle(props.size);
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
      sizeStyle,
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
