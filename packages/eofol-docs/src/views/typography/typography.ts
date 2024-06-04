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
import { page } from "../../ui";
import { getTheme, sx } from "@eofol/eofol";
import { EofolElementNode } from "@eofol/eofol-types";
import {
  foxJumpsOverLazyDog,
  mathLoremIpsum,
  shortLoremIpsum,
  loremIpsum,
} from "../../data";

// @TODO theme
const theme = getTheme();

const typographyWrapperStyle = sx({
  display: "flex",
  flexDirection: "column",
  margin: "16px 0 16px 0",
});

const typographyLineWrapperStyle = sx({
  display: "flex",
  justifyContent: "center",
  margin: "8px 0 8px 0",
});

const typographyEndWrapperStyle = sx({
  display: "flex",
  whiteSpace: "pre-wrap",
});

const typographyTitleStyle = sx({ color: theme.color.secondary.base });

const typographyElementNameStyle = sx({ color: "#536dfe" });

const typographyWrapper = (children: EofolElementNode) =>
  div(typographyWrapperStyle, children);

const typographyLineWrapper = (children: EofolElementNode) =>
  div(typographyLineWrapperStyle, children);

const renderGenericTypographyGroup = (
  groupName: string,
  description: string,
  content: Element[]
) => [
  h2(groupName, typographyElementNameStyle),
  p(description),
  typographyWrapper(content),
];

const renderTextTypography = (
  elementName: string,
  render: (content: string, classname?: string) => Element
) =>
  typographyLineWrapper(
    div(typographyEndWrapperStyle, [
      render(elementName, typographyTitleStyle),
      render(` - ${foxJumpsOverLazyDog}`),
    ])
  );

const renderTextTypographyGroup = (
  groupName: string,
  description: string,
  props: { name: string; render: (content: string) => Element }[]
) =>
  renderGenericTypographyGroup(
    groupName,
    description,
    props.map(({ name, render }) => renderTextTypography(name, render))
  );

const renderMathTypography = (
  elementName: string,
  render: (content: string) => Element
) =>
  typographyLineWrapper([
    p(`${elementName} - `, typographyTitleStyle),
    p(mathLoremIpsum[0]),
    render(mathLoremIpsum[1]),
    p(mathLoremIpsum[2]),
    render(mathLoremIpsum[3]),
    p(mathLoremIpsum[4]),
    render(mathLoremIpsum[5]),
  ]);

const headingsData = [
  { name: "H1", render: h1 },
  { name: "H2", render: h2 },
  { name: "H3", render: h3 },
  { name: "H4", render: h4 },
  { name: "H5", render: h5 },
  { name: "H6", render: h6 },
];

const paragraphData = [{ name: "P", render: p }];

const computerCodeData = [
  { name: "Code", render: code },
  { name: "Pre", render: pre },
  { name: "Kbd", render: kbd },
];

const semanticTextData = [
  { name: "Abbr", render: abbr },
  { name: "Em", render: em },
  { name: "Address", render: address },
  { name: "Blockquote", render: blockquote },
];

const revisionData = [
  { name: "Del", render: del },
  { name: "Ins", render: ins },
];

const styledTextData = [
  { name: "Small", render: small },
  { name: "Strong", render: strong },
];

const mathData = [
  { name: "Sub", render: sub },
  { name: "Sup", render: sup },
];

const headings = renderTextTypographyGroup(
  "Headings",
  shortLoremIpsum,
  headingsData
);
const paragraph = renderTextTypographyGroup(
  "Paragraph",
  shortLoremIpsum,
  paragraphData
);
const computerCode = renderTextTypographyGroup(
  "Computer code",
  shortLoremIpsum,
  computerCodeData
);
const revision = renderTextTypographyGroup(
  "Revisions",
  shortLoremIpsum,
  revisionData
);
const semanticText = renderTextTypographyGroup(
  "Semantic text",
  shortLoremIpsum,
  semanticTextData
);
const styledText = renderTextTypographyGroup(
  "Styled text",
  shortLoremIpsum,
  styledTextData
);
const math = renderGenericTypographyGroup(
  "Math",
  shortLoremIpsum,
  mathData.map(({ name, render }) => renderMathTypography(name, render))
);

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
