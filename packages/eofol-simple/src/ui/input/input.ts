import { InputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { cx, cxFlat, getThemeStyles } from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";

export const input = (props: InputProps) => {
  const themeStyles = getThemeStyles();
  const schemeImpl = props.scheme ?? "secondary";

  const baseStyle = themeStyles.inputBase;
  const baseTransitionStyle = themeStyles.inputBaseOutlineTransition;
  const sizeStyle = getInputSizeStyle(props.size);
  const colorStyle = themeStyles.color[schemeImpl];
  const focusStyle = themeStyles.inputFocus[schemeImpl];
  const notFocusStyle = themeStyles.inputBaseOutline;
  const errorFocusStyle = themeStyles.inputErrorFocus;
  const borderStyle = themeStyles.inputBorder[schemeImpl];
  const errorBorderStyle = themeStyles.inputErrorBorder;

  return inputBase({
    ...props,
    type: "text",
    classname: cx(
      baseStyle,
      baseTransitionStyle,
      colorStyle,
      sizeStyle,
      notFocusStyle,
      focusStyle,
      errorFocusStyle,
      borderStyle,
      errorBorderStyle,
      cxFlat(props.classname)
    ),
  });
};

export default input;
