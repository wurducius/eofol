import { createElement, ax, getThemeStyles } from "@eofol/eofol";
import { EButton, ESizable, EComponent } from "../../types";
import { getTheme, sx } from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";

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
  scheme?: "primary" | "secondary";
  active?: boolean;
} & EButton &
  ESizable &
  EComponent) => {
  const theme = getTheme();
  const themeStyles = getThemeStyles();

  const baseStyle = themeStyles.buttonBase;
  const fullStyle = sx({ width: "100%" });
  const sizeStyle = getInputSizeStyle(size);
  const disabledStyle = themeStyles.inputDisabled;

  const getButtonStyle = (isSecondary: boolean, isActive?: boolean) => ({
    fontSize: theme.typography.text.fontSize,
    backgroundColor: isActive ? theme.color.primary : "black",
    color: isSecondary
      ? theme.color.secondary
      : isActive
      ? "black"
      : theme.color.primary,
    border: `1px solid ${
      isSecondary ? theme.color.secondary : theme.color.primary
    }`,
  });

  const schemeStyle = sx(getButtonStyle(scheme === "secondary", active));

  const getButtonHoverStyle = (isSecondary: boolean) => ({
    backgroundColor: isSecondary
      ? theme.color.secondaryDark
      : theme.color.primaryDarker,
    color: "#000000",
    border: `1px solid ${
      isSecondary ? theme.color.secondaryLighter : theme.color.primaryLighter
    }`,
  });

  const schemeHoverStyle = sx(
    getButtonHoverStyle(scheme === "secondary"),
    ":hover"
  );

  const element = createElement(
    "button",
    [
      sizeStyle,
      baseStyle,
      schemeStyle,
      schemeHoverStyle,
      disabled && disabledStyle,
      full && fullStyle,
      classname,
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
