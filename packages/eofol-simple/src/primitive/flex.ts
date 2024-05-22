import { sy, cx, sx as sxx } from "@eofol/eofol";
import { div } from "./div";

const FlexStyleBase = sy({ display: "flex" }, "flex-base");

export const flex = (
  {
    grow,
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    sx,
  }: {
    grow?: number;
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    flexWrap?: string;
    sx?: string;
  },
  children: string | Element | Element[]
) =>
  div(
    cx(
      FlexStyleBase,
      sxx({
        flex: grow ?? "inherit",
        justifyContent: justifyContent ?? "inherit",
        alignItems: alignItems ?? "inherit",
        // @ts-ignore
        flexDirection: flexDirection ?? "inherit",
        // @ts-ignore
        flexWrap: flexWrap ?? "inherit",
      }),
      sx
    ),
    children
  );

export default flex;
