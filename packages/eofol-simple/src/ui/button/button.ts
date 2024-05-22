import {
  createElement,
  ax,
  getThemeStyles,
  staticStyles,
  cxFlat,
} from "@eofol/eofol";
import { getTheme, sx } from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";
import {
  ButtonVariant,
  ColorSchemePalette,
  EButton,
  EComponent,
  Schemable,
  Sizable,
} from "@eofol/eofol-types";
import { getColorScheme } from "../../util/scheme";

const getButtonStyle = (
  colorScheme: ColorSchemePalette,
  variant?: ButtonVariant,
  isActive?: boolean
) => {
  const theme = getTheme();

  if (variant === "solid") {
    return {
      backgroundColor: isActive
        ? theme.color.background.base
        : colorScheme.base,
      color: isActive ? colorScheme.base : "black",
      border: `1px solid ${colorScheme.base}`,
    };
  } else if (variant === "ghost") {
    return {
      backgroundColor: isActive ? colorScheme.base : "transparent",
      color: isActive ? "black" : colorScheme.base,
      border: `1px solid transparent`,
    };
  }
  return {
    backgroundColor: isActive ? colorScheme.base : theme.color.background.base,
    color: isActive ? "black" : colorScheme.base,
    border: `1px solid ${colorScheme.base}`,
  };
};

const getButtonHoverStyle = (colorScheme: ColorSchemePalette) => ({
  backgroundColor: colorScheme.dark,
  color: "black",
  border: `1px solid ${colorScheme.light}`,
});

const button = ({
  onClick,
  onBlur,
  size,
  full,
  disabled,
  classname,
  children,
  scheme,
  active,
  variant,
}: {
  full?: boolean;
  active?: boolean;
} & EButton &
  Schemable &
  Sizable &
  EComponent) => {
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
  // @ts-ignore
  element.onclick = onClick;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};

export default button;
