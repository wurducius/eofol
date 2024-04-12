import { createElement, cx, ax } from "@eofol/eofol";
import {
  EComponentWithoutChildren,
  EInput,
  ESizable,
  getSize,
} from "../../types";

const select = ({
  options,
  name,
  onChange,
  onBlur,
  value,
  disabled,
  placeholder,
  size,
  styles,
}: {
  options: { title: string; id: string }[];
  placeholder?: string;
} & EInput<string> &
  ESizable &
  EComponentWithoutChildren) => {
  const element = createElement(
    "select",
    cx(
      "select-base",
      disabled && "select-disabled",
      getSize("select")(size),
      styles
    ),
    options.map((option) =>
      createElement(
        "option",
        undefined,
        option.title,
        ax({ value: option.id }, [
          "selected",
          option.id === value && "selected",
        ])
      )
    ),
    ax(
      { name, id: name },
      ["disabled", disabled && "disabled"],
      ["value", value],
      ["placeholder", placeholder && "placeholder"]
    )
  );
  // @ts-ignore
  element.onchange = (e) => {
    // @ts-ignore
    onChange(e.target.value);
  };
  // @ts-ignore
  element.onblur = (e) => {
    if (onBlur) {
      // @ts-ignore
      onBlur(e.target.value);
    }
  };
  return element;
};
export default select;
