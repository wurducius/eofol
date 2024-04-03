import { CSSObject } from "@eofol/eofol-types";
import { injectStyle } from "./dynamic-styles";

const syStyleCache: string[] = [];

const sy = (
  style: CSSObject,
  classname: string,
  excludeCustomElements?: boolean
) => injectStyle(style, classname, syStyleCache, excludeCustomElements);

export default sy;
