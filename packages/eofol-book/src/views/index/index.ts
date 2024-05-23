import "../../styles/base.css";
import "./index.css";
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
  tagName: "eofol-ui",
  render: () =>
    createElement(
      "div",
      sx({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
      [
        a({ link: "./index.html", children: "Eofol UI" }),
        a({ link: "./form.html", children: "Form" }),
        a({ link: "./navigation.html", children: "Navigation" }),
        a({ link: "./typography.html", children: "Typography" }),
      ]
    ),
});
