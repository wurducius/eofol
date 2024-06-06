import {
  ax,
  createElement,
  cxFlat,
  getThemeStyles,
  staticStyles,
  sx,
} from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";
import { getColorScheme } from "../../util/scheme";
import { getButtonStyle, getButtonHoverStyle } from "./button-styles";
import { ButtonBaseProps } from "@eofol/eofol-types";

export const buttonBase = ({
  onClick,
  size,
  full,
  disabled,
  classname,
  children,
  scheme,
  active,
  variant,
}: ButtonBaseProps) => {
  const themeStyles = getThemeStyles();

  const colorScheme = getColorScheme(scheme);

  const baseStyle = themeStyles.buttonBase;
  const sizeStyle = getInputSizeStyle(size);
  const disabledStyle = themeStyles.inputDisabled;
  const schemeStyle = sx(getButtonStyle(colorScheme, variant, active));
  const schemeHoverStyle = sx(
    getButtonHoverStyle(colorScheme),
    ":not(:disabled):hover"
  );

  const element = createElement(
    "button",
    [
      sizeStyle,
      baseStyle,
      schemeStyle,
      schemeHoverStyle,
      disabled && disabledStyle,
      full && staticStyles.full,
      cxFlat(classname),
    ],
    children,
    ax({}, ["disabled", disabled])
  );

  if (onClick) {
    element.onclick = onClick;
  }

  return element;
};
