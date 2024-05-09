import { NumberInputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, sx, cx, createStyle } from "@eofol/eofol";
import div from "../primitive/div";
import { INPUT_INVALID } from "../../util/validation";

const hideArrowsClassname = "number-input-hide-arrows";

const numberInput = (props: NumberInputProps) => {
  const theme = getTheme();

  const hideArrows = true;
  const arrowStyle = props.arrowStyle;

  const renderArrows = !props.hideArrows;

  // @TODO: hard hack, please refactor
  createStyle(`.${hideArrowsClassname} { -moz-appearance: textfield; }`);
  createStyle(
    `.number-input-hide-arrows::-webkit-outer-spin-button,
  .number-input-hide-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } { -webkit-appearance: none; margin: 0; }`
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
  });

  const invalidStyle = sx(
    { border: `1px solid ${theme.color.error}`, position: "relative" },
    `.${INPUT_INVALID}`
  );

  const validStyle = sx(
    { border: `1px solid ${theme.color.secondary}`, position: "relative" },
    `:not(.${INPUT_INVALID})`
  );

  const inputBaseFocus = sx(
    { outline: `2px solid ${theme.color.secondary}`, position: "relative" },
    `:not(.${INPUT_INVALID}):focus`
  );
  const inputBaseInvalidFocus = sx(
    { outline: `2px solid ${theme.color.error}`, position: "relative" },
    `.${INPUT_INVALID}:focus`
  );

  const handleArrowSpin = (parity: number) => () => {
    const defaultVal = props.min ?? 0;
    const prevVal = Number(props.value);
    const isPrevValValid = Number.isFinite(prevVal) && !Number.isNaN(prevVal);
    const nextVal = isPrevValValid
      ? prevVal + parity * (props.step ?? 1)
      : defaultVal;
    const clampedMinVal = props.min ? Math.max(nextVal, props.min) : nextVal;
    const clampedMaxVal = props.max
      ? Math.min(clampedMinVal, props.max)
      : clampedMinVal;
    props.onChange(clampedMaxVal);
  };
  const handleArrowUp = handleArrowSpin(1);
  const handleArrowDown = handleArrowSpin(-1);

  const arrowCustomStyle = sx({
    height: "14px",
    backgroundColor: theme.color.backgroundElevation,
    border: `1px solid ${theme.color.primary}`,
    color: theme.color.primary,
    fontSize: "10px",
    cursor: "pointer",
  });
  const arrowCustomHoverStyle = sx(
    {
      backgroundColor: theme.color.primary,
      border: `1px solid #000000`,
      color: "#000000",
    },
    ":hover"
  );
  const arrowCustomFocusStyle = sx(
    {
      backgroundColor: theme.color.primary,
      border: `1px solid #000000`,
      color: "#000000",
    },
    ":focus"
  );
  const upArrow = div(
    [arrowCustomStyle, arrowCustomHoverStyle, arrowCustomFocusStyle],
    "+",
    undefined,
    {
      // @ts-ignore
      onclick: handleArrowUp,
    }
  );
  const downArrow = div(
    [arrowCustomStyle, arrowCustomHoverStyle, arrowCustomFocusStyle],
    "-",
    undefined,
    {
      // @ts-ignore
      onclick: handleArrowDown,
    }
  );
  const afterArrows = div(
    sx({
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "0px",
      right: "0px",
      margin: "8px 0 8px 0",
      border: "1px solid transparent",
      height: "28px",
      zIndex: 1,
      width: "24px",
    }),
    [upArrow, downArrow]
  );

  // @TODO: typing
  // @ts-ignore
  return inputBase({
    ...props,
    type: "number",
    // @ts-ignore
    classname: cx(
      baseStyle,
      validStyle,
      invalidStyle,
      inputBaseInvalidFocus,
      inputBaseFocus,
      hideArrows && hideArrowsClassname,
      props.classname
    ),
    after: renderArrows && afterArrows,
  });
};

export default { numberInput };
