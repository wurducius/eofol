import { createElement, sy } from "@eofol/eofol/dist";

const tooltip = (title: string, children: Element) => {
  return createElement("div", "tooltip-base", [
    children,
    createElement(
      "div",
      [
        "tooltip-content",
        sy(
          {
            backgroundColor: "#111111",
            color: "#dddddd",
            fontSize: "16px",
            width: "fit-content",
            height: "fit-content",
            border: "1px solid #dddddd",
            padding: "6px 6px",
          },
          "tooltip-content-style"
        ),
      ],
      title
    ),
  ]);
};

export default tooltip;
