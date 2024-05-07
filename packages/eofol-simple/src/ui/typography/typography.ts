import { createElement, cx, sy } from "@eofol/eofol";
import { EComponent } from "../../types";
import { TypographyNodeContent } from "@eofol/eofol-types";

const h1Impl = ({ styles, children }: EComponent) =>
  createElement("h1", styles, children);

const h2Impl = ({ styles, children }: EComponent) =>
  createElement("h2", styles, children);

const h3Impl = ({ styles, children }: EComponent) =>
  createElement("h3", styles, children);

const h4Impl = ({ styles, children }: EComponent) =>
  createElement("h4", styles, children);

const h5Impl = ({ styles, children }: EComponent) =>
  createElement("h5", styles, children);

const h6Impl = ({ styles, children }: EComponent) =>
  createElement("h6", styles, children);

const pImpl = ({ styles, children }: EComponent) =>
  createElement("p", styles, children);

const codeImpl = ({ styles, children }: EComponent) =>
  createElement("code", styles, children);

const typographyNoGuttersStyle = sy(
  { marginTop: 0, marginBottom: 0 },
  "typography-base-no-gutters"
);

export const p = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  pImpl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h1 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h1Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h2 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h2Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h3 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h3Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h4 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h4Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h5 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h5Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const h6 = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  h6Impl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export const code = (
  content: TypographyNodeContent,
  styles?: string,
  noGutters?: boolean
) =>
  codeImpl({
    children: content,
    styles: cx(noGutters ? typographyNoGuttersStyle : undefined, styles),
  });

export default { h1, h2, h3, h4, h5, h6, p, code };
