import { EofolElementNode } from "@eofol/eofol-types";
import { sy } from "@eofol/eofol";
import { div } from "..";

const containerBaseStyle = sy(
  { maxWidth: "1920px", margin: "0 auto 0 auto" },
  "container-base"
);

const container = (children: EofolElementNode, classname?: string) =>
  div([containerBaseStyle, classname], children);

export default container;
