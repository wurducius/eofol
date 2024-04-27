import { createElement } from "@eofol/eofol";
import { EComponent } from "../../types";

const h1 = ({ styles, children }: EComponent) =>
  createElement("h1", styles, children);

const h2 = ({ styles, children }: EComponent) =>
  createElement("h2", styles, children);

const h3 = ({ styles, children }: EComponent) =>
  createElement("h3", styles, children);

const h4 = ({ styles, children }: EComponent) =>
  createElement("h4", styles, children);

const h5 = ({ styles, children }: EComponent) =>
  createElement("h5", styles, children);

const h6 = ({ styles, children }: EComponent) =>
  createElement("h6", styles, children);

const p = ({ styles, children }: EComponent) =>
  createElement("p", styles, children);

const code = ({ styles, children }: EComponent) =>
  createElement("code", styles, children);

export default { h1, h2, h3, h4, h5, h6, p, code };
