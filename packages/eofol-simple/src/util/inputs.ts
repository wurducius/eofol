import { SIZE } from "@eofol/eofol-types";
import { getThemeStyles } from "@eofol/eofol";

export const getInputSizeStyle = (size: SIZE) => {
  const themeStyles = getThemeStyles();

  if (size === "sm") {
    return themeStyles.inputSizeSm;
  } else if (size === "lg") {
    return themeStyles.inputSizeLg;
  } else if (size === "xl") {
    return themeStyles.inputSizeXl;
  }
  return themeStyles.inputSizeMd;
};
