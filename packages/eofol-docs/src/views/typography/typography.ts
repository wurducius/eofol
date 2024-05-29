import "../base.css";
import { defineBuiltinElement, sx } from "@eofol/eofol";
import {
  abbr,
  address,
  blockquote,
  code,
  container,
  del,
  div,
  em,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ins,
  kbd,
  p,
  pre,
  small,
  strong,
  sub,
  sup,
} from "@eofol/eofol-simple";
import { init } from "../../util";
import {
  appbar,
  foxJumpsOverLazyDog,
  layout,
  loremIpsum,
  shortLoremIpsum,
} from "../../ui";

init();

const headings = [
  h2("Headings"),
  p(shortLoremIpsum),
  h1("H1 - " + foxJumpsOverLazyDog),
  h2("H2 - " + foxJumpsOverLazyDog),
  h3("H3 - " + foxJumpsOverLazyDog),
  h4("H4 - " + foxJumpsOverLazyDog),
  h5("H5 - " + foxJumpsOverLazyDog),
  h6("H6 - " + foxJumpsOverLazyDog),
];

const paragraph = [
  h2("Paragraph"),
  p(shortLoremIpsum),
  p("P - " + foxJumpsOverLazyDog),
];

const computerCode = [
  h2("Computer code"),
  p(shortLoremIpsum),
  code("Code - " + foxJumpsOverLazyDog),
  pre("Pre - " + foxJumpsOverLazyDog),
  kbd("Kbd - " + foxJumpsOverLazyDog),
];

const semanticText = [
  h2("Semantic text"),
  p(shortLoremIpsum),
  abbr("Abbr - " + foxJumpsOverLazyDog),
  em("Em - " + foxJumpsOverLazyDog),
  address("Address - " + foxJumpsOverLazyDog),
  blockquote("Blockquote - " + foxJumpsOverLazyDog),
];

const revision = [
  h2("Revisions"),
  p(shortLoremIpsum),
  del("Del - " + foxJumpsOverLazyDog),
  ins("Ins - " + foxJumpsOverLazyDog),
];

const math = [
  h2("Math"),
  p(shortLoremIpsum),
  sub("Sub - " + foxJumpsOverLazyDog),
  sup("Sup - " + foxJumpsOverLazyDog),
];

const styledText = [
  h2("Styled text"),
  p(shortLoremIpsum),
  small("Small - " + foxJumpsOverLazyDog),
  strong("Strong - " + foxJumpsOverLazyDog),
];

const contentElement = div(undefined, [
  h1("Typography"),
  p(loremIpsum),
  ...headings,
  ...paragraph,
  ...semanticText,
  ...revision,
  ...styledText,
  ...computerCode,
  ...math,
]);

const navbarElement = div(undefined, []);

defineBuiltinElement({
  tagName: "eofol-docs",
  render: () => {
    return container(
      [appbar(), layout(navbarElement, contentElement)],
      sx({ height: "100%" })
    );
  },
});
