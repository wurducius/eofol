import { ElementNode } from "@eofol/eofol-types";
import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { getSize, SIZE } from "../../types";

const checkbox = ({
  onChange,
  onBlur,
  value,
  disabled,
  name,
  size,
  styles,
  children,
}: {
  onChange: (nextValue: { target: { value: boolean } }) => void;
  onBlur: (nextValue: { target: { value: boolean } }) => void;
  value?: boolean;
  disabled?: boolean;
  name: string;
  size?: SIZE;
  styles?: string;
  children?: ElementNode;
}) => {
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
