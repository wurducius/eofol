import { createElement, ax, sx, getTheme, getThemeStyles } from "@eofol/eofol";
import { EComponentWithoutChildren, EInput, ESizable } from "../../types";
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
  const themeStyles = getThemeStyles();

  const baseStyle = sx({
    padding: "6px 10px",
    marginTop: "8px",
    fontSize: theme.typography.text.fontSize,
    backgroundColor: theme.color.background,
    color: theme.color.secondary,
    width: "100%",
  });
  const borderStyle = themeStyles.inputBorder;
  const sizeStyle = getInputSizeStyle(size);
  const focusStyle = themeStyles.inputFocus;

  const element = createElement(
    "select",
    [sizeStyle, baseStyle, borderStyle, focusStyle, styles],
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
