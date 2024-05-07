import { ax, createElement, cx, getTheme, sx } from "@eofol/eofol";
import { EComponent } from "../../types";

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

  const baseStyle = sx({ color: theme.color.secondaryDark });

  const hoverStyle = sx({ color: theme.color.secondaryLighter }, ":hover");

  return createElement(
    "a",
    cx(baseStyle, hoverStyle, styles),
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

export default a;
