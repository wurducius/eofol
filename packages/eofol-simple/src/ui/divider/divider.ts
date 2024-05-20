import { createElement, sx } from "@eofol/eofol";

const divider = (color?: string, height?: number) => {
  return createElement(
    "hr",
    sx({
      borderBottom: `${height ?? 1}px solid ${color ?? "grey"}`,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      margin: "0 0 0 0",
    }),
    undefined
  );
};

export default divider;
