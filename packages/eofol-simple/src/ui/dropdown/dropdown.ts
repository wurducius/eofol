import {
  addCx,
  createElement,
  cx,
  getTheme,
  removeCx,
  staticStyles,
  sx,
} from "@eofol/eofol";
import button from "../button/button";
import dropdownContent from "./dropdown-content";

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
      (isSecondary ? theme.color.secondary.dark : theme.color.primary.dark) +
      " !important",
    color: "#000000" + " !important",
    border:
      `1px solid ${
        isSecondary ? theme.color.secondary.light : theme.color.primary.light
      }` + " !important",
  });
  const hoverStyle = sx(getButtonHoverStyle(false));

  const buttonElement = button({
    children: title,
    classname: cx(staticStyles.full, buttonClassname),
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

export default dropdown;
