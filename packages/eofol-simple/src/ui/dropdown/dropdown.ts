import { addCx, createElement, cx, getTheme, removeCx, sx } from "@eofol/eofol";
import button from "../button/button";

const openMenu = (id: string) => {
  const contentNew = document.getElementById(id);
  if (contentNew) {
    contentNew.setAttribute("style", "display: block;");
  }
};

const closeMenu = (id: string) => {
  const contentNew = document.getElementById(id);
  if (contentNew) {
    contentNew.setAttribute("style", "display: none;");
  }
};

const dropdown = ({
  id,
  title,
  children,
  classname,
  buttonClassname,
  contentClassname,
}: {
  id: string;
  title: string;
  children: Element | Element[];
  classname?: string | undefined;
  buttonClassname?: string | undefined;
  contentClassname?: string | undefined;
}) => {
  const theme = getTheme();

  const getButtonHoverStyle = (isSecondary: boolean) => ({
    backgroundColor:
      (isSecondary ? theme.color.secondaryDark : theme.color.primaryDarker) +
      " !important",
    color: "#000000" + " !important",
    border:
      `1px solid ${
        isSecondary ? theme.color.secondaryLighter : theme.color.primaryLighter
      }` + " !important",
  });
  const hoverStyle = sx(getButtonHoverStyle(false));

  const buttonElement = button({
    children: title,
    classname: cx(sx({ width: "100%" }), buttonClassname),
    scheme: "primary",
  });

  return createElement(
    "div",
    cx(sx({ display: "flex", cursor: "pointer" }), classname),
    [buttonElement, dropdownContent(id, contentClassname, children)],
    undefined,
    {
      // @ts-ignore
      onmouseover: () => {
        openMenu(id);
        addCx(buttonElement, hoverStyle);
      },
      // @ts-ignore
      onmouseleave: () => {
        closeMenu(id);
        removeCx(buttonElement, hoverStyle);
      },
    }
  );
};

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

export default { dropdown, dropdownContent };
