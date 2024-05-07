import { EofolClassname, EofolElementNode } from "@eofol/eofol-types";
import { createElement } from "@eofol/eofol";

export const div = (
  classname?: EofolClassname,
  children?: EofolElementNode,
  attributes?: any,
  properties?: any
) => createElement("div", classname, children, attributes, properties);

export default div;
