import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EComponentWithoutChildren, EInput, ESizable, getSize } from "../../types";

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
} & EInput<string> & ESizable & EComponentWithoutChildren) => {
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
  element.onchange = onChange;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};
export default select;
