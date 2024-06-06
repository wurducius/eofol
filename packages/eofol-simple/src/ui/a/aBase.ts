import { createElement, ax } from "@eofol/eofol";
import { AProps } from "@eofol/eofol-simple-types";

export const aBase = ({
  link,
  external,
  download,
  classname,
  children,
}: AProps) => {
  return createElement(
    "a",
    classname,
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

export default aBase;
