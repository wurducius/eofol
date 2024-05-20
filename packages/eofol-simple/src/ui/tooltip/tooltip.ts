import { createElement, getTheme, sy } from "@eofol/eofol";

sy({ display: "inline-block" }, "tooltip-base");

sy({ display: "block" }, "tooltip-base:hover.tooltip-content");

const tooltip = (title: string, children: Element) => {
  const theme = getTheme();

  sy(
    { display: "none", position: "absolute", zIndex: theme.zIndex.tooltip },
    "tooltip-base.tooltip-content"
  );

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
