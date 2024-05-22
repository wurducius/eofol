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

const text =
  (tagName: string) =>
  (
    content: TypographyNodeContent,
    classname?: string,
    noGutters?: boolean,
    attributes?: any,
    properties?: any
  ) =>
    createTypographyTextElement(
      tagName,
      classname,
      content,
      attributes,
      properties,
      noGutters
    );

const heading =
  (tagName: string) =>
  (
    content: TypographyNodeContent,
    classname?: string,
    noGutters?: boolean,
    attributes?: any,
    properties?: any
  ) =>
    createTypographyHeadingElement(
      tagName,
      classname,
      content,
      attributes,
      properties,
      noGutters
    );

export const h1 = heading("h1");
export const h2 = heading("h2");
export const h3 = heading("h3");
export const h4 = heading("h4");
export const h5 = heading("h5");
export const h6 = heading("h6");
export const blockquote = heading("blockquote");

export const p = text("p");
export const code = text("code");
export const pre = text("pre");
export const kbd = text("kbd");
export const abbr = text("abbr");
export const small = text("small");
export const strong = text("strong");
export const em = text("em");
export const del = text("del");
export const ins = text("ins");
export const sub = text("sub");
export const sup = text("sup");
export const address = text("address");

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
  em,
  del,
  ins,
  sub,
  sup,
  address,
};
