import {
  ax,
  createElement,
  cxFlat,
  getTheme,
  getThemeStyles,
  staticStyles,
  sx,
  sy,
} from "@eofol/eofol";
import { getInputSizeStyle } from "../../util/inputs";
import { getColorScheme } from "../../util/scheme";
import {
  ColorSchemePalette,
  ButtonVariant,
  Sizable,
  Schemable,
} from "@eofol/eofol-types";

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

const iconButton = ({
  icon,
  onClick,
  title,
  alt,
  disabled,
  classname,
  iconPosition,
  iconMargin,
  scheme,
  size,
  full,
}: {
  icon: string;
  onClick?: () => void;
  title?: string;
  alt: string;
  disabled?: boolean;
  classname?: string;
  iconPosition?: "left" | "right";
  iconMargin?: string;
  full?: boolean;
} & Sizable &
  Schemable) => {
  // @TODO
  const active = false;
  const variant = "solid";

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

  const isIconPositionLeft = !iconPosition || iconPosition === "left";

  const iconMarginImpl = iconMargin ?? "8px";
  const iconStyleLeft = sy(
    {
      height: "24px",
      width: "24px",
      marginRight: iconMarginImpl,
      marginLeft: "0",
    },
    "iconbutton-img-left"
  );
  const iconStyleRight = sy(
    {
      height: "24px",
      width: "24px",
      marginRight: "0",
      marginLeft: iconMarginImpl,
    },
    "iconbutton-img-right"
  );
  const iconElement = createElement(
    "img",
    isIconPositionLeft ? iconStyleLeft : iconStyleRight,
    undefined,
    ax(
      {
        src: icon,
        alt,
      },
      ["disabled", disabled]
    )
  );
  const titleElement = title ?? "";

  const content = (
    isIconPositionLeft
      ? [iconElement, titleElement]
      : [titleElement, iconElement]
  ).filter(Boolean);

  const element = createElement(
    "button",
    [
      sx({ display: "inline-flex", alignItems: "center" }),
      sizeStyle,
      baseStyle,
      schemeStyle,
      schemeHoverStyle,
      disabled && disabledStyle,
      full && staticStyles.full,
      cxFlat(classname),
    ],
    content
  );

  if (onClick) {
    element.onclick = onClick;
  }

  return element;
};

export default iconButton;
