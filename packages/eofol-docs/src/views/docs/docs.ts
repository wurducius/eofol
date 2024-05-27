import "../base.css";
import { defineBuiltinElement, sx } from "@eofol/eofol";
import { container, div, h1, p } from "@eofol/eofol-simple";
import { init } from "../../util";
import { appbar, layout, loremIpsum } from "../../ui";

init();

const navbarElement = div(undefined, []);

const contentElement = div(undefined, [
  h1("Content"),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
  p(loremIpsum),
]);

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container(
      [appbar(), layout(navbarElement, contentElement)],
      sx({ height: "100%" })
    );
  },
});
