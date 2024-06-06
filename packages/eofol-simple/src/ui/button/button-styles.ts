import { ColorSchemePalette, ButtonVariant } from "@eofol/eofol-types";
import { getTheme } from "@eofol/eofol";

export const getButtonStyle = (
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

export const getButtonHoverStyle = (colorScheme: ColorSchemePalette) => ({
  backgroundColor: colorScheme.dark,
  color: "black",
  border: `1px solid ${colorScheme.light}`,
});
