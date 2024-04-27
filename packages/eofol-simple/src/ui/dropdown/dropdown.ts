import { createElement, cx, sx } from "@eofol/eofol";

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
  contentClassname,
}: {
  id: string;
  title: string;
  children: Element | Element[];
  classname?: string | undefined;
  contentClassname?: string | undefined;
}) => {
  return createElement(
    "div",
    cx(sx({ display: "flex" }), classname),
    [
      createElement("button", sx({ width: "100%" }), title, undefined, {}),
      dropdownContent(id, contentClassname, children),
    ],
    undefined,
    {
      // @ts-ignore
      onmouseover: () => {
        openMenu(id);
      },
      // @ts-ignore
      onmouseleave: () => {
        closeMenu(id);
      },
    }
  );
};

const dropdownContent = (
  id: string,
  classname: string | undefined,
  children: Element | Element[]
) => {
  return createElement(
    "div",
    [
      sx({
        display: "none",
        position: "absolute",
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
