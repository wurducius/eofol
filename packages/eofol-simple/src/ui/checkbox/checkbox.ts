import { createElement, cx, ax } from "@eofol/eofol";
import { EInput, ESizable, EComponent, getSize } from "../../types";

const checkbox = ({
  onChange,
  onBlur,
  value,
  disabled,
  name,
  size,
  styles,
  children,
}: EInput<boolean> & ESizable & EComponent) => {
  const element = createElement(
    "input",
    cx(
      "checkbox-size",
      getSize("checkbox")(size),
      disabled && "checkbox-disabled",
      styles
    ),
    children,
    ax(
      { name, id: name, type: "checkbox" },
      ["disabled", disabled],
      ["checked", value]
    )
  );
  // @ts-ignore
  element.onchange = onChange;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};

export default checkbox;
