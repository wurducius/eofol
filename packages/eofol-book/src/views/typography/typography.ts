import "../../styles/base.css";
import "./typography.css";
import svgPath from "../phi.svg";
import { createElement, defineBuiltinElement, sx } from "@eofol/eofol";
import { h1, h2, h3, h4, h5, h6, p, code } from "@eofol/eofol-simple";

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

defineBuiltinElement({
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
        h1("H1"),
        h2("H2"),
        h3("H3"),
        h4("H4"),
        h5("H5"),
        h6("H6"),
        p("P"),
        code("Code"),
      ]
    ),
});
