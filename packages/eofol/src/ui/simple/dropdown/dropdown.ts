import { createElement, sx } from "../../..";

const dropdown = (
  id: string,
  title: string,
  classname: string | string[] | undefined
) => {
  return createElement("button", classname, title, undefined, {
    // @ts-ignore
    onmouseover: () => {
      const contentNew = document.getElementById(id);
      if (contentNew) {
        contentNew.setAttribute("style", "display: block;");
      }
    },
  });
};

const dropdownContent = (
  id: string,
  classname: string,
  children: Element | Element[]
) => {
  return createElement(
    "div",
    [
      sx({
        display: "none",
        position: "absolute",
      }),
      classname,
    ],
    createElement(
      "div",
      sx({
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
      }),
      children
    ),
    {
      id,
    },
    {
      // @ts-ignore
      onmouseleave: () => {
        const contentNew = document.getElementById(id);
        if (contentNew) {
          contentNew.setAttribute("style", "display: none;");
        }
      },
    }
  );
};

export default { dropdown, dropdownContent };
