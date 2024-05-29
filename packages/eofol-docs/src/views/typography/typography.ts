import {
  h2,
  p,
  h1,
  h3,
  h4,
  h5,
  h6,
  code,
  pre,
  kbd,
  abbr,
  em,
  address,
  blockquote,
  del,
  ins,
  sub,
  sup,
  small,
  strong,
  div,
} from "@eofol/eofol-simple";
import {
  foxJumpsOverLazyDog,
  loremIpsum,
  mathLoremIpsum,
  page,
  shortLoremIpsum,
} from "../../ui";
import { sx } from "@eofol/eofol";

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

const renderMathTypography = (
  elementName: string,
  render: (content: string) => Element
) =>
  div(
    sx({
      display: "inline-flex",
    }),
    [
      p(`${elementName} - `),
      p(mathLoremIpsum[0]),
      render(mathLoremIpsum[1]),
      p(mathLoremIpsum[2]),
      render(mathLoremIpsum[3]),
      p(mathLoremIpsum[4]),
      render(mathLoremIpsum[5]),
    ]
  );

const math = [
  h2("Math"),
  p(shortLoremIpsum),
  renderMathTypography("Sub", sub),
  renderMathTypography("Sup", sup),
];

const styledText = [
  h2("Styled text"),
  p(shortLoremIpsum),
  small("Small - " + foxJumpsOverLazyDog),
  strong("Strong - " + foxJumpsOverLazyDog),
];

const contentElement = [
  h1("Typography"),
  p(loremIpsum),
  ...headings,
  ...paragraph,
  ...semanticText,
  ...revision,
  ...styledText,
  ...computerCode,
  ...math,
];

page(contentElement);
