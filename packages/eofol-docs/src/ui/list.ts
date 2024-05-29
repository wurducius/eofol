import { EofolElementNode } from "@eofol/eofol-types";
import { createElement, sx } from "@eofol/eofol";

export const unorderedListTag = (children: EofolElementNode) =>
  createElement("ul", sx({ textAlign: "left" }), children);

export const listItemTag = (children: EofolElementNode) =>
  createElement("li", sx({ marginTop: "8px" }), children);
