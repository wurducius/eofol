import { cxFlat, sx, sy } from "@eofol/eofol";
import aBase from "./aBase";
import { EComponent } from "@eofol/eofol-types";
import { AProps } from "@eofol/eofol-simple-types";
import { getColorScheme } from "../../util/scheme";

const baseStyle = sy(
  {
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: "inherit",
  },
  "a-base"
);

const a = (props: AProps & EComponent) => {
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
      cxFlat(props.classname),
    ],
  });
};

export default a;
