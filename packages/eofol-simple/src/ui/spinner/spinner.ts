import { createElement, createStyle, sx } from "@eofol/eofol";

createStyle(
  ".spinner-base { border-bottom-color: transparent; border-radius: 50%; display: inline-block; box-sizing: border-box; animation: spinner-rotation 1s linear infinite; }"
);
createStyle(
  "@keyframes spinner-rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } "
);

const spinner = (props?: { size?: number; color?: string }) =>
  createElement("div", [
    "spinner-base",
    sx({
      height: `${props?.size ?? 24}px`,
      width: `${props?.size ?? 24}px`,
      border: `5px solid ${props?.color ?? "fuchsia"}`,
    }),
  ]);

export default spinner;
