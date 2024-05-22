import { getTheme, createElement, sx, cx } from "@eofol/eofol";

const dropdownContent = (
  id: string,
  classname: string | undefined,
  children: Element | Element[]
) => {
  const theme = getTheme();

  return createElement(
    "div",
    [
      sx({
        display: "none",
        position: "absolute",
        zIndex: theme.zIndex.dropdown,
      }),
      cx(classname),
    ],
    createElement(
      "div",
      sx({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
        marginTop: "40px",
      }),
      children
    ),
    {
      id,
    }
  );
};

export default dropdownContent;
