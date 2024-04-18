import "../../styles/base.css";
import "./form.css";

import svgPath from "../phi.svg";

import {
  createElement,
  defineBuiltinElement,
  sx,
  select,
  checkbox,
  button,
} from "@eofol/eofol";

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

defineBuiltinElement({
  tagName: "eofol-form",
  render: () =>
    createElement(
      "div",
      sx({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
      [
        checkbox({
          name: "eofol-checkbox",
          onChange: () => {
            console.log("checkbox changed");
          },
          onBlur: () => {},
        }),
        button({
          onClick: () => {
            console.log("button pressed");
          },
          children: "Button",
        }),
        select({
          name: "eofol-select",
          options: [
            { id: "a", title: "First" },
            { id: "b", title: "Second" },
            { id: "c", title: "Third" },
          ],
          onChange: () => {
            console.log("select changed");
          },
          placeholder: "Placeholder",
        }),
      ]
    ),
});
