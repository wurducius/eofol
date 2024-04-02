import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EComponent, EInput, ESizable, getSize } from "../../types";

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
      ["value", value]
    )
  );
  // @ts-ignore
  element.onchange = onChange;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};

export default checkbox;
