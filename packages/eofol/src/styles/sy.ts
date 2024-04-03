import { CSSObject } from "@eofol/eofol-types";
import { injectStyle } from "./dynamic-styles";

const syStyleCache: string[] = [];

const sy = (style: CSSObject, classname: string, forceInject?: boolean) =>
  injectStyle(style, classname, syStyleCache, undefined, forceInject);

export default sy;
