import { createElement, cx, ax } from "@eofol/eofol";
import {
  EComponentWithoutChildren,
  EInput,
  ESizable,
  getSize,
} from "../../types";

const renderOption = (
  option: { title: string; id: string },
  value: string | undefined
) =>
  createElement(
    "option",
    undefined,
    option.title,
    ax({ value: option.id }, ["selected", option.id === value && "selected"])
  );

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
  options: (
    | { title: string; id: string }
    | { group: string; options: { title: string; id: string }[] }
  )[];
  placeholder?: string;
} & EInput<string> &
  ESizable &
  EComponentWithoutChildren) => {
  const element = createElement(
    "select",
    [
      "select-base",
      disabled && "select-disabled",
      getSize("select")(size),
      styles,
    ],
    options.map((option) => {
      if ("group" in option && "options" in option) {
        return createElement(
          "optgroup",
          undefined,
          option.options.map((item) => renderOption(item, value)),
          {
            label: option.group,
          }
        );
      } else {
        return renderOption(option, value);
      }
    }),
    ax(
      { name, id: name },
      ["disabled", disabled && "disabled"],
      ["value", value],
      ["placeholder", placeholder && "placeholder"],
      ["aria-label", name]
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
