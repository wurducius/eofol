import { createElement, ax } from "@eofol/eofol";
import { EComponent } from "../../types";
import { AProps } from "@eofol/eofol-types";

export const aBase = ({
  link,
  external,
  download,
  classname,
  children,
}: AProps & EComponent) => {
  return createElement(
    "a",
    classname,
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

export default aBase;
