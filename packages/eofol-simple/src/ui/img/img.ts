import { createElement, cx, ax } from "@eofol/eofol";
import { EComponent } from "../../types";
// @ts-ignore
import defaultFallback from "./default-fallback.png";

const img = ({
  src,
  alt,
  height,
  width,
  fallback,
  styles,
  children,
}: {
  src: string;
  alt: string;
  fallback?: string;
  height?: number | string;
  width?: number | string;
} & EComponent) =>
  createElement(
    "img",
    styles,
    children,
    ax(
      {
        alt,
        onerror: `this.onerror = null; this.src = "${
          fallback ?? defaultFallback
        }";`,
      },
      ["src", src],
      ["height", height],
      ["width", width]
    )
  );

export default img;
