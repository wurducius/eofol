import {
  createElement,
  cx,
  ax,
  createStyleObj,
  sx,
  getTheme,
} from "@eofol/eofol";
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
  const theme = getTheme();

  const baseStyle = sx({
    width: "24px",
    height: "24px",
    accentColor: theme.color.secondary,
    cursor: "pointer",
    color: theme.color.backgroundElevation,
  });

  const hoverStyle = sx({ accentColor: theme.color.secondaryDarker }, `:hover`);

  const element = createElement(
    "input",
    [
      "checkbox-size",
      getSize("checkbox")(size),
      disabled && "checkbox-disabled",
      baseStyle,
      hoverStyle,
      styles,
    ],
    children,
    ax(
      { name, id: name, type: "checkbox" },
      ["disabled", disabled],
      ["checked", value],
      ["aria-label", name]
    )
  );
  // @ts-ignore
  element.onchange = onChange;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};

export default checkbox;
