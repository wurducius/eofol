import { cxFlat, getTheme, sx } from "@eofol/eofol";
import { aBase } from "./aBase";
import { getColorScheme } from "../../util/scheme";
import { EComponent, Schemable, Sizable } from "@eofol/eofol-types";
import { getInputSizeStyle } from "../../util/inputs";
import { AProps } from "@eofol/eofol-simple-types";

const linkButton = (props: AProps & EComponent & Schemable & Sizable) => {
  const theme = getTheme();
  const colorScheme = getColorScheme(props.scheme);
  const sizeStyle = getInputSizeStyle(props.size);

  const baseStyle = sx({
    textDecoration: "none",
    fontFamily: "inherit",
    padding: "0 16px",
    backgroundColor: theme.color.background.base,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
  });

  const linkButtonStyle = sx({
    color: colorScheme.base,
    border: `1px solid ${colorScheme.base}`,
  });

  const linkButtonHoverStyle = sx(
    {
      color: "black",
      backgroundColor: colorScheme.dark,
      border: `1px solid ${colorScheme.light}`,
    },
    ":hover"
  );

  return aBase({
    ...props,
    classname: [
      baseStyle,
      sizeStyle,
      linkButtonStyle,
      linkButtonHoverStyle,
      cxFlat(props.classname),
    ],
  });
};

export default linkButton;
