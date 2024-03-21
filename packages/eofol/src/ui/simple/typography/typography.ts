import { ElementNode } from "@eofol/eofol-types";
import createElement from "../../../core/create-element";

const h1 = (styles?: string, children?: ElementNode) =>
  createElement("h1", styles, children);

const h2 = (styles?: string, children?: ElementNode) =>
  createElement("h2", styles, children);

const h3 = (styles?: string, children?: ElementNode) =>
  createElement("h3", styles, children);

const h4 = (styles?: string, children?: ElementNode) =>
  createElement("h4", styles, children);

const h5 = (styles?: string, children?: ElementNode) =>
  createElement("h5", styles, children);

const h6 = (styles?: string, children?: ElementNode) =>
  createElement("h6", styles, children);

const p = (styles?: string, children?: ElementNode) =>
  createElement("p", styles, children);

const code = (styles?: string, children?: ElementNode) =>
  createElement("code", styles, children);

export default { h1, h2, h3, h4, h5, h6, p, code };
