import { ElementNode } from "@eofol/eofol-types";
import createElement from "../../../core/create-element";
import { ax } from "../../../util/simple";

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
  styles?: string;
  children?: ElementNode;
}) =>
  createElement(
    "img",
    styles,
    children,
    ax(
      { alt, onerror: `this.onerror = null; this.src = "${fallbackImg}";` },
      ["src", src],
      ["height", height],
      ["width", width]
    )
  );

export default img;
