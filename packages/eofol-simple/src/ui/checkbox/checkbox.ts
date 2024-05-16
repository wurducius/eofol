import { createElement, ax, sx, getTheme, getThemeStyles } from "@eofol/eofol";
import { EInput, ESizable, EComponent } from "../../types";
import div from "../primitive/div";
import { getCheckboxSizeStyle } from "../../util/inputs";

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
    [baseStyle, styles],
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
        border: `1px solid ${theme.color.backgroundElevation}`,
        cursor: "pointer",
        backgroundColor: value
          ? theme.color.secondaryDark
          : theme.color.backgroundColor,
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
          outline: `2px solid ${theme.color.secondary}`,
          color: theme.color.secondary,
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
