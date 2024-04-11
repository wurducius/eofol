import { createElement } from "../../../core/render-element";
import { ax, cx } from "../../../util/simple";
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
    cx(styles),
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
