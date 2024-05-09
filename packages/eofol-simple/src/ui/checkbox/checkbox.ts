import { createElement, ax, sx, getTheme } from "@eofol/eofol";
import { EInput, ESizable, EComponent, getSize } from "../../types";
import div from "../primitive/div";

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
  /*
  const baseStyle = sx({
    width: "24px",
    height: "24px",
    accentColor: theme.color.secondary,
    cursor: "pointer",
    color: theme.color.backgroundElevation,
  });

  const hoverStyle = sx({ accentColor: theme.color.secondaryDarker }, `:hover`);
*/

  const baseStyle = sx({
    height: 0,
    width: 0,
    position: "relative",
    margin: "0 0 0 0",
  });

  const inputElement = createElement(
    "input",
    [
      "checkbox-size",
      getSize("checkbox")(size),
      disabled && "checkbox-disabled",
      baseStyle,
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
  inputElement.onchange = onChange;
  // @ts-ignore
  inputElement.onblur = onBlur;

  const frontElement = div(
    [
      sx({
        position: "absolute",
        top: "0px",
        right: "0px",
        width: "24px",
        height: "24px",
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
      height: "32px",
      width: "32px",
      margin: "8px 4px 8px 4px",
    }),
    [inputElement, frontElement]
  );

  return wrapperElement;
};

export default checkbox;
