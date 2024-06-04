import { div, iconButton } from "@eofol/eofol-simple";
import { getThemeState, toggleTheme } from "../styles";
import { sx } from "@eofol/eofol";
import sunPath from "../assets/sun.svg";
import moonPath from "../assets/moon.svg";

export const themeToggle = () => {
  const themeId = getThemeState();

  return div(
    undefined,
    iconButton({
      icon: themeId === "dark" ? sunPath : moonPath,
      alt: "Theme icon",
      classname: sx({ backgroundColor: "transparent" }),
      onClick: () => {
        toggleTheme();
      },
    })
  );
};
