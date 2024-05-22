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
  ColorSchemePalette,
  EButton,
  EComponent,
  Schemable,
  Sizable,
} from "@eofol/eofol-types";
import { getColorScheme } from "../../util/scheme";

const getButtonStyle = (
  colorScheme: ColorSchemePalette,
  isActive?: boolean
) => {
  const theme = getTheme();

  return {
    fontSize: theme.typography.text.fontSize,
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
  const schemeStyle = sx(getButtonStyle(colorScheme, active));
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
