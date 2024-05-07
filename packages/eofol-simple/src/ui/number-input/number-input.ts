import { NumberInputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, sx, sy, cx } from "@eofol/eofol";

const numberInput = (props: NumberInputProps) => {
  const theme = getTheme();

  const hideArrows = props.hideArrows;
  const arrowStyle = props.arrowStyle;

  const styleObj = { "-webkit-appearance": "none", margin: "0 0 0 0" };
  const innerSpinButtonStyle = sx(styleObj, "::-webkit-inner-spin-button");
  const outerSpinButtonStyle = sx(styleObj, "::-webkit-outer-spin-button");

  const hideArrowsStyle = sy(
    // @ts-ignore
    { "-moz-appearance": "textfield" },
    "number-input-hide-arrows"
  );

  const baseStyle = sx({
    zIndex: 0,
    cursor: "text",
    padding: "2px 10px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: theme.typography.text.fontSize,
    height: "24px",
    backgroundColor: theme.color.backgroundElevation,
    color: theme.color.secondary,
    border: `1px solid ${theme.color.secondary}`,
  });

  const focusStyle = sx(
    { outline: `2px solid ${theme.color.secondary}` },
    ":focus:not(.input-invalid)"
  );

  // @TODO: typing
  // @ts-ignore
  return inputBase({
    ...props,
    type: "number",
    // @ts-ignore
    classname: cx(
      baseStyle,
      focusStyle,
      ...(hideArrows
        ? [hideArrowsStyle, innerSpinButtonStyle, outerSpinButtonStyle]
        : []),
      props.classname
    ),
  });
};

export default { numberInput };
