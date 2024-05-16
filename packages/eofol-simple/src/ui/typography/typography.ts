import { createElement, sy } from "@eofol/eofol";
import { TypographyNodeContent } from "@eofol/eofol-types";

const createTypographyElement = (
  tagName: string,
  classname: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGuttersStyle?: boolean
) =>
  createElement(
    tagName,
    [noGuttersStyle && typographyNoGuttersStyle, classname],
    content,
    attributes,
    properties
  );

const createTypographyHeadingElement = (
  tagName: string,
  classname: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGutters?: boolean
) =>
  createTypographyElement(
    tagName,
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

const createTypographyTextElement = (
  tagName: string,
  classname: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGutters?: boolean
) =>
  createTypographyElement(
    tagName,
    classname,
    content,
    attributes,
    properties,
    noGutters !== false
  );

const typographyNoGuttersStyle = sy(
  { marginTop: 0, marginBottom: 0 },
  "typography-base-no-gutters"
);

export const p = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "p",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h1 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h1",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h2 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h2",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h3 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h3",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h4 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h4",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h5 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h5",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const h6 = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h6",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const code = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "code",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const pre = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "pre",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const kbd = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "kbd",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const blockquote = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "blockquote",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const abbr = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "abbr",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const small = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "small",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const strong = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "strong",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const mark = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "mark",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const em = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "em",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const del = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "del",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const ins = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "ins",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const sub = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "sub",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const sup = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "sup",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export const address = (
  content: TypographyNodeContent,
  classname?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "address",
    classname,
    content,
    attributes,
    properties,
    noGutters
  );

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  code,
  pre,
  kbd,
  blockquote,
  abbr,
  small,
  strong,
  mark,
  em,
  del,
  ins,
  sub,
  sup,
  address,
};
