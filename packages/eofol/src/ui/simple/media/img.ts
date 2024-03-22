import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EComponent } from "../../types";

// @TODO
const fallbackImg = "/logo512.png";

const img = ({
  src,
  alt,
  height,
  width,
  styles,
  children,
}: {
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
} & EComponent) =>
  createElement(
    "img",
    cx(styles),
    children,
    ax(
      { alt, onerror: `this.onerror = null; this.src = "${fallbackImg}";` },
      ["src", src],
      ["height", height],
      ["width", width]
    )
  );

export default img;
