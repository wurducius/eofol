import "../../styles/base.css";
import "./navigation.css";
import svgPath from "../phi.svg";
import { createElement, defineBuiltinElement, sx } from "@eofol/eofol";
import { a } from "@eofol/eofol-simple";

const svgElement: HTMLImageElement | null = <HTMLImageElement>(
  document.getElementById("eofol-svg")
);

if (svgElement) {
  svgElement.src = svgPath;
}

defineBuiltinElement({
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
