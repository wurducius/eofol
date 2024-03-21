import { ElementNode } from "@eofol/eofol-types";
import createElement from "../../../core/create-element";
import { ax } from "../../../util/simple";

const a = ({
  link,
  external,
  download,
  styles,
  children,
}: {
  link: string;
  external?: boolean;
  download?: string;
  styles?: string;
  children?: ElementNode;
}) =>
  createElement(
    "a",
    styles,
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );

export default a;
