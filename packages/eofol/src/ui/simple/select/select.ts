import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { SIZE, getSize } from "../../types";

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
  name: string;
  onChange?: (nextValue: string) => void;
  onBlur?: (nextValue: string) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: SIZE;
  styles?: string;
}) => {
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
