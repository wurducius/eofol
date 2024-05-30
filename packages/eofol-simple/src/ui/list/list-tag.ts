import { EofolElementNode } from "@eofol/eofol-types";
import { createElement, sx } from "@eofol/eofol";

export const orderedListTag = (
  children: EofolElementNode,
  classname?: string
) => createElement("ol", [sx({ textAlign: "left" }), classname], children);

export const unorderedListTag = (
  children: EofolElementNode,
  classname?: string
) => createElement("ul", [sx({ textAlign: "left" }), classname], children);

export const listItemTag = (children: EofolElementNode) =>
  createElement("li", sx({ marginTop: "8px" }), children);
