import { cx, sx, sy } from "@eofol/eofol";
import { EComponent } from "../../types";
import aBase from "./aBase";
import { AProps, Schemable } from "@eofol/eofol-types";
import { getColorScheme } from "../../util/scheme";

const baseStyle = sy(
  {
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: "inherit",
  },
  "a-base"
);

const a = (props: AProps & EComponent & Schemable) => {
  const colorScheme = getColorScheme(props.scheme, "secondary");

  const themedBaseStyle = sx({
    color: colorScheme.dark,
  });

  const themedHoverStyle = sx({ color: colorScheme.light }, ":hover");

  return aBase({
    ...props,
    classname: [
      baseStyle,
      themedBaseStyle,
      themedHoverStyle,
      cx(props.classname),
    ].filter(Boolean),
  });
};

export default a;
