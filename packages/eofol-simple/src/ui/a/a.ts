import { getTheme, sx } from "@eofol/eofol";
import { EComponent } from "../../types";
import aBase from "./aBase";

const a = (
  props: {
    link: string;
    external?: boolean;
    download?: string;
  } & EComponent
) => {
  const theme = getTheme();

  const baseStyle = sx({
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: "inherit",
  });

  const themedBaseStyle = sx({
    color: theme.color.secondaryDark,
  });

  const themedHoverStyle = sx(
    { color: theme.color.secondaryLighter },
    ":hover"
  );

  return aBase({
    ...props,
    classname: [
      baseStyle,
      themedBaseStyle,
      themedHoverStyle,
      ...props.classname,
    ],
  });
};

export default a;
