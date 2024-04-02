import "../../styles/base.css";
import "./typography.css";

import svgPath from "../phi.svg";

import {
  createElement,
  defineCustomElement,
  sx,
  h1,
  code,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
} from "@eofol/eofol";

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

defineCustomElement({
  tagName: "eofol-typography",
  render: () =>
    createElement(
      "div",
      sx({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
      [
        h1(undefined, "H1"),
        h2(undefined, "H2"),
        h3(undefined, "H3"),
        h4(undefined, "H4"),
        h5(undefined, "H5"),
        h6(undefined, "H6"),
        p(undefined, "P"),
        code(undefined, "Code"),
      ]
    ),
});
