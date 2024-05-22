import { cx, getTheme, sx } from "@eofol/eofol";
import { aBase } from "./aBase";
import { getColorScheme } from "../../util/scheme";
import { AProps, Schemable, Sizable } from "@eofol/eofol-types";
import { EComponent } from "../../types";
import { getInputSizeStyle } from "../../util/inputs";

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
      cx(props.classname),
    ].filter(Boolean),
  });
};

export default linkButton;
