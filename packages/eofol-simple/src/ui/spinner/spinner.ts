import { createElement, getTheme, sx, sy } from "@eofol/eofol";

const spinnerBaseStyle = sy(
  {
    borderBottomColor: "transparent",
    borderRadius: "50%",
    display: "inline-block",
    boxSizing: "border-box",
    animation: "spinner-rotation 1s linear infinite",
  },
  "spinner-base"
);

const spinner = (props?: { size?: number; color?: string }) => {
  const theme = getTheme();

  return createElement("div", [
    spinnerBaseStyle,
    sx({
      height: `${props?.size ?? 24}px`,
      width: `${props?.size ?? 24}px`,
      border: `5px solid ${props?.color ?? theme.color.primary.base}`,
    }),
  ]);
};

export default spinner;
