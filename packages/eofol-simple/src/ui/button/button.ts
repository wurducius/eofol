import { createElement, ax } from "@eofol/eofol";
import { EButton, ESizable, EComponent, getSize } from "../../types";
import { getTheme, sx } from "@eofol/eofol";

const button = ({
  onClick,
  onBlur,
  size,
  full,
  disabled,
  styles,
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

  const baseStyle = sx({
    cursor: "pointer",
    minHeight: "36px",
    padding: "0 16px",
    fontSize: theme.typography.text.fontSize,
    fontWeight: 500,
  });

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
      "button-base",
      getSize("button")(size),
      full && "button-full",
      disabled && "button-disabled",
      baseStyle,
      schemeStyle,
      schemeHoverStyle,
      styles,
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
