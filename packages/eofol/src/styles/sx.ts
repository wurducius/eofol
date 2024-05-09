import { CSSObject } from "@eofol/eofol-types";
import { murmurhash2_32_gc } from "../util/crypto";
import { injectStyle } from "./dynamic-styles";

const seed = new Date().getMilliseconds();

const sxHash = (style: CSSObject, seed: number) =>
  "e" + murmurhash2_32_gc(JSON.stringify(style), seed).toString();

const sxStyleCache: string[] = [];

const sx = (style: CSSObject, pseudoSelector?: string, forceInject?: boolean) =>
  injectStyle(
    { ...style, pseudoselector: pseudoSelector ?? "" },
    sxHash(style, seed),
    sxStyleCache,
    pseudoSelector,
    forceInject
  );

export default sx;
