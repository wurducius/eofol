import { createElement, cx, ax, sx, getTheme } from "@eofol/eofol";
import {
  EComponentWithoutChildren,
  EInput,
  ESizable,
  getSize,
} from "../../types";
import { getInputSizeStyle } from "../../util/inputs";

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
  const theme = getTheme();

  const baseStyle = sx({
    padding: "6px 10px",
    marginTop: "8px",
    fontSize: theme.typography.text.fontSize,
    height: "36px",
    width: "256px",
    backgroundColor: theme.color.background,
    color: theme.color.secondary,
    border: `1px solid ${theme.color.secondary}`,
  });

  const sizeStyle = getInputSizeStyle(size);

  const focusStyle = sx(
    { outline: `2px solid ${theme.color.secondary}` },
    ":focus"
  );

  const element = createElement(
    "select",
    [
      "select-base",
      disabled && "select-disabled",
      sizeStyle,
      baseStyle,
      focusStyle,
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
