import { createElement, sy } from "@eofol/eofol";
import { TypographyNodeContent } from "@eofol/eofol-types";

const createTypographyElement = (
  tagName: string,
  styles: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGuttersStyle?: boolean
) =>
  createElement(
    tagName,
    [noGuttersStyle && typographyNoGuttersStyle, styles],
    content,
    attributes,
    properties
  );

const createTypographyHeadingElement = (
  tagName: string,
  styles: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGutters?: boolean
) =>
  createTypographyElement(
    tagName,
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

const createTypographyTextElement = (
  tagName: string,
  styles: string | undefined,
  content: TypographyNodeContent,
  attributes?: any,
  properties?: any,
  noGutters?: boolean
) =>
  createTypographyElement(
    tagName,
    styles,
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
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "p",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h1 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h1",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h2 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h2",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h3 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h3",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h4 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h4",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h5 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h5",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const h6 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "h6",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const code = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "code",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const pre = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "pre",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const kbd = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "kbd",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const blockquote = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyHeadingElement(
    "blockquote",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const abbr = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "abbr",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const small = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "small",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const strong = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "strong",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const mark = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "mark",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const em = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "em",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const del = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "del",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const ins = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "ins",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const sub = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "sub",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const sup = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "sup",
    styles,
    content,
    attributes,
    properties,
    noGutters
  );

export const address = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean,
  attributes?: any,
  properties?: any
) =>
  createTypographyTextElement(
    "address",
    styles,
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
