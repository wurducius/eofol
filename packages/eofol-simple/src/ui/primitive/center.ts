import { EofolElementNode } from "@eofol/eofol-types";
import { div } from "./div";
import { sy } from "@eofol/eofol";

const CenterStyleBase = sy(
  { display: "flex", justifyContent: "center", alignItems: "center" },
  "center-base"
);

export const center = (children: EofolElementNode) =>
  div(CenterStyleBase, children);

export default center;
