import { createElement, ax } from "@eofol/eofol";
import defaultFallback from "../../../assets/img/default-fallback.png";
import { EComponent } from "@eofol/eofol-types";

const img = ({
  src,
  alt,
  height,
  width,
  fallback,
  classname,
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
    classname,
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
