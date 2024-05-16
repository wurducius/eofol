import { createElement, ax } from "@eofol/eofol";
import { EComponent } from "../../types";

export const aBase = ({
  link,
  external,
  download,
  classname,
  children,
}: {
  link: string;
  external?: boolean;
  download?: string;
} & EComponent) => {
  return createElement(
    "a",
    classname,
    children,
    ax({ href: link }, ["target", external && "_blank"], ["download", download])
  );
};

export default aBase;
