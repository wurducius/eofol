import {
  createElement,
  ax,
  sx,
  getTheme,
  getThemeStyles,
  cxFlat,
} from "@eofol/eofol";
import div from "../../primitive/div";
import { getCheckboxSizeStyle } from "../../util/inputs";
import { EComponent, EInput, Sizable } from "@eofol/eofol-types";

const checkbox = ({
  onChange,
  onBlur,
  value,
  disabled,
  name,
  size,
  classname,
  children,
}: EInput<boolean> & Sizable & EComponent) => {
  const theme = getTheme();
  const themeStyles = getThemeStyles();

  const baseStyle = sx({
    height: 0,
    width: 0,
    position: "relative",
    margin: "0 0 0 0",
  });
  const disabledStyle = themeStyles.inputDisabled;

  const inputElement = createElement(
    "input",
    [baseStyle, cxFlat(classname)],
    children,
    ax(
      { name, id: name, type: "checkbox" },
      ["disabled", disabled],
      ["checked", value],
      ["aria-label", name]
    )
  );
  // @ts-ignore
  inputElement.onchange = onChange;
  // @ts-ignore
  inputElement.onblur = onBlur;

  const sizeStyle = getCheckboxSizeStyle(size);

  const frontElement = div(
    [
      sx({
        position: "absolute",
        top: "auto",
        right: "auto",
        margin: "8px 4px 8px 4px",
        border: `1px solid ${theme.color.background.elevation}`,
        cursor: "pointer",
        backgroundColor: value
          ? theme.color.secondary.dark
          : theme.color.background.base,
        color: "#000000",
        fontSize: "16px",
        fontWeight: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }),
      sizeStyle,
      disabled && disabledStyle,
      sx(
        {
          outline: `2px solid ${theme.color.secondary.base}`,
          color: theme.color.secondary.base,
        },
        ":hover"
      ),
    ],
    value ? "X" : "",
    undefined,
    {
      // @ts-ignore
      onclick: () => {
        if (onChange) {
          onChange(!value);
        }
      },
      // @ts-ignore
      onblur: () => {
        if (onBlur) {
          onBlur(!value);
        }
      },
    }
  );

  const wrapperElement = div(
    sx({
      position: "relative",
      display: "flex",
      height: "32px",
      width: "32px",
      margin: "8px 4px 8px 4px",
    }),
    [inputElement, frontElement]
  );

  return wrapperElement;
};

export default checkbox;
