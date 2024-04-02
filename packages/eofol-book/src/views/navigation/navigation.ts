import "../../styles/base.css";
import "./navigation.css";

import svgPath from "../phi.svg";

import { createElement, defineCustomElement, sx, a } from "@eofol/eofol";

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

defineCustomElement({
  tagName: "eofol-navigation",
  render: () =>
    createElement(
      "div",
      sx({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
      [a({ link: "https://eofol.com", external: true, children: "EOFOL.COM" })]
    ),
});
