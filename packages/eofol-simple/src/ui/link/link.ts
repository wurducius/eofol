import { ax, createElement, cx } from "@eofol/eofol";
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
