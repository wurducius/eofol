import "../base.css";
import { defineBuiltinElement, sx } from "@eofol/eofol";
import { container, div, h1 } from "@eofol/eofol-simple";
import { init } from "../../util";
import { appbar, layout } from "../../ui";

init();

const navbarElement = div(undefined, []);

const contentElement = div(undefined, [h1("Getting started")]);

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container(
      [appbar(), layout(navbarElement, contentElement)],
      sx({ height: "100%" })
    );
  },
});
