import { ColorScheme } from "@eofol/eofol-types";
import { getTheme } from "@eofol/eofol";

export const getColorScheme = (
  scheme: ColorScheme,
  defaultScheme?: ColorScheme
) => {
  return getTheme().color[scheme ?? defaultScheme ?? "primary"];
};
