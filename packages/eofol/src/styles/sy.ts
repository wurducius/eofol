import { CSSObject } from "@eofol/eofol-types";
import { injectStyle } from "./dynamic-styles";

const syStyleCache: string[] = [];

const sy = (
  style: CSSObject,
  classname: string,
  forceInject?: boolean,
  pseudoSelector?: string
) => injectStyle(style, classname, syStyleCache, pseudoSelector, forceInject);

export default sy;
