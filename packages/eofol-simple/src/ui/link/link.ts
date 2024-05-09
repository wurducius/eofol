import { ax, createElement, cx, getTheme, sx, sy } from "@eofol/eofol";
import { EComponent } from "../../types";

const baseStyle = sy({ textDecoration: "none", fontWeight: 700 }, "a-base");

const a = ({
  link,
  external,
  download,
  styles,
  children,
}: {
  link: string;
  external?: boolean;
  download?: string;
} & EComponent) => {
  const theme = getTheme();

  const themedBaseStyle = sx({
    color: theme.color.secondaryDark,
  });

  const themedHoverStyle = sx(
    { color: theme.color.secondaryLighter },
    ":hover"
  );

  return createElement(
    "a",
    [baseStyle, themedBaseStyle, themedHoverStyle, styles],
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

export default a;
