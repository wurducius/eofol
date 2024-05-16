import { ax, createElement, getTheme, sx } from "@eofol/eofol";
import { EComponent } from "../../types";

export const aBase = ({
  link,
  external,
  download,
  classname,
  children,
}: {
  link: string;
  external?: boolean;
  download?: string;
} & EComponent) => {
  return createElement(
    "a",
    classname,
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

const linkButton = (props: {
  children: Element | string;
  classname?: string;
  link: string;
  external?: boolean;
  download?: string;
  scheme?: "primary" | "secondary";
}) => {
  const theme = getTheme();

  const schemeColor = theme.color[props.scheme ?? "primary"];
  const schemeColorLighter = theme.color[`${props.scheme ?? "primary"}Lighter`];
  const schemeColorDarker =
    props.scheme === "secondary"
      ? theme.color.secondaryDark
      : theme.color.primaryDarker;

  const linkButtonStyle = sx({
    textDecoration: "none",
    fontFamily: "inherit",
    padding: "0 16px",
    backgroundColor: "black",
    color: schemeColor,
    border: `1px solid ${schemeColor}`,
    height: "31px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
  });

  const linkButtonHoverStyle = sx(
    {
      color: "black",
      backgroundColor: schemeColorDarker,
      border: `1px solid ${schemeColorLighter}`,
    },
    ":hover"
  );

  return aBase({
    ...props,
    classname: [
      linkButtonStyle,
      linkButtonHoverStyle,
      ...(props.classname ?? []),
    ].filter(Boolean),
  });
};

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

export default { a, linkButton, aBase };
