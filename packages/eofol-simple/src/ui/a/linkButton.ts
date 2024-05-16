import { getTheme, sx } from "@eofol/eofol";
import { aBase } from "./aBase";

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

export default linkButton;
