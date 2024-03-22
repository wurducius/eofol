import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EComponent } from "../../types";

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
} & EComponent) =>
  createElement(
    "a",
    cx(styles),
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );

export default a;
