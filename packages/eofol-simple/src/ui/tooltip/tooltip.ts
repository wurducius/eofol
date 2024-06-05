import { sy, getThemeStyles } from "@eofol/eofol";
import div from "../../primitive/div";

sy({ display: "inline-block" }, "tooltip-base");

sy({ display: "block" }, "tooltip-base:hover > .tooltip-content");

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
  "tooltip-content"
);

const tooltip = (title: string, children: Element) => {
  const themeStyles = getThemeStyles();

  return div("tooltip-base", [
    children,
    div(["tooltip-content", themeStyles.tooltipContent], title),
  ]);
};

export default tooltip;
