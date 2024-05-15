import { NumberInputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, sx, cx, createStyle, addCx, removeCx } from "@eofol/eofol";
import div from "../primitive/div";
import { INPUT_INVALID } from "../../util/validation";
import {
  INPUT_BORDER,
  INPUT_ERROR_BORDER,
  INPUT_ERROR_OUTLINE,
  INPUT_FOCUS_OUTLINE,
  INPUT_NO_FOCUS_OUTLINE,
  INPUT_TRANSITION_STYLE,
} from "../../styles/input-styles";

const NUMBER_INPUT_SPINNER_DELAY_INTERVAL_MS = 300;

const NUMBER_INPUT_SPINNER_ITERATION_INTERVAL_MS = 50;

const hideArrowsClassname = "number-input-hide-arrows";

const NUMBER_INPUT_DEFAULT_INPUT_MODE = "decimal";

const stringifyValue =
  (precision?: number, format?: (nextVal: number) => string) =>
  (val: number) => {
    const numberVal = Number(val);
    if (format) {
      return format(numberVal);
    } else {
      if (precision) {
        return numberVal.toFixed(precision);
      } else {
        return numberVal.toString();
      }
    }
  };

const parseValue =
  (precision?: number, parse?: (nextStrVal: string) => number) =>
  (strVal: string) => {
    if (parse) {
      return parse(strVal);
    } else {
      if (precision) {
        return Number(Number(strVal).toFixed(precision));
      } else {
        return Number(strVal);
      }
    }
  };

const numberInput = (props: NumberInputProps) => {
  const theme = getTheme();

  const showDefaultArrows = props.hideArrows === "default";
  const showCustomArrows = !showDefaultArrows && !props.hideArrows;
  // const arrowStyle = props.arrowStyle;

  const allowOutOfRange = props.allowOutOfRange;

  const precision = props.precision;

  const inputMode = props.inputMode ?? NUMBER_INPUT_DEFAULT_INPUT_MODE;

  const invalidExplicit = props.invalid;

  const formatProp = props.format;
  const parseProp = props.parse;

  const stringify = stringifyValue(precision, formatProp);
  const parse = parseValue(precision, parseProp);

  // @TODO: hard hack, please refactor
  createStyle(`.${hideArrowsClassname} { -moz-appearance: textfield; }`);
  createStyle(
    `.${hideArrowsClassname}::-webkit-outer-spin-button,
  .${hideArrowsClassname}::-webkit-inner-spin-button {
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
    transition: INPUT_TRANSITION_STYLE,
  });

  const invalidStyle = sx(
    { border: INPUT_ERROR_BORDER(theme) },
    `.${INPUT_INVALID}`
  );

  const validStyle = sx(
    { border: INPUT_BORDER(theme) },
    `:not(.${INPUT_INVALID})`
  );

  const inputBaseNotFocus = sx(
    { outline: INPUT_NO_FOCUS_OUTLINE },
    `:not(:focus)`
  );
  const inputBaseFocus = sx(
    { outline: INPUT_FOCUS_OUTLINE(theme) },
    `:not(.${INPUT_INVALID}):focus`
  );
  const inputBaseInvalidFocus = sx(
    { outline: INPUT_ERROR_OUTLINE(theme) },
    `.${INPUT_INVALID}:focus`
  );

  const numberInputSpinnerDisabled = sx({
    cursor: "not-allowed",
    backgroundColor: "grey",
    color: "black",
  });

  let currentValue = Number(props.value);

  let isValueMin = typeof props.min === "number" && currentValue <= props.min;
  let isValueMax = typeof props.max === "number" && currentValue >= props.max;

  const handleArrowSpin = (parity: 1 | -1) => () => {
    const defaultVal = props.min ?? 0;
    const prevVal = currentValue;
    const isPrevValValid = Number.isFinite(prevVal) && !Number.isNaN(prevVal);
    const nextVal = isPrevValValid
      ? prevVal + parity * (props.step ?? 1)
      : defaultVal;
    const clampedMinVal =
      typeof props.min === "number" ? Math.max(nextVal, props.min) : nextVal;
    const clampedMaxVal =
      typeof props.max === "number"
        ? Math.min(clampedMinVal, props.max)
        : clampedMinVal;
    if (
      !props.validation ||
      props.validation
        .map((validationItem) => validationItem(clampedMaxVal))
        .filter((x) => !x).length == 0
    ) {
      currentValue = clampedMaxVal;
      const lastIsValueMin = isValueMin;
      const lastIsValueMax = isValueMax;
      isValueMin = typeof props.min === "number" && currentValue <= props.min;
      isValueMax = typeof props.max === "number" && currentValue >= props.max;
      if (!lastIsValueMin && isValueMin) {
        addCx(downArrow, numberInputSpinnerDisabled);
        removeCx(
          downArrow,
          arrowCustomNotDisabledStyle,
          arrowCustomHoverStyle,
          arrowCustomFocusStyle
        );
      }
      if (lastIsValueMin && !isValueMin) {
        removeCx(downArrow, numberInputSpinnerDisabled);
        addCx(
          downArrow,
          arrowCustomNotDisabledStyle,
          arrowCustomHoverStyle,
          arrowCustomFocusStyle
        );
      }
      if (!lastIsValueMax && isValueMax) {
        addCx(upArrow, numberInputSpinnerDisabled);
        removeCx(
          upArrow,
          arrowCustomNotDisabledStyle,
          arrowCustomHoverStyle,
          arrowCustomFocusStyle
        );
      }
      if (lastIsValueMax && !isValueMax) {
        removeCx(upArrow, numberInputSpinnerDisabled);
        addCx(
          upArrow,
          arrowCustomNotDisabledStyle,
          arrowCustomHoverStyle,
          arrowCustomFocusStyle
        );
      }
    }
  };
  const commitChangedValue = () => {
    props.onChange(currentValue);
  };

  let spinIntervalDelayTimeout: NodeJS.Timeout | null = null;
  let spinIntervalTimeout: NodeJS.Timeout | null = null;

  let inputHTMLElement: HTMLElement | null = null;

  const updateInputElementValue = (nextValue: number) => {
    // @TODO optimize
    if (!inputHTMLElement) {
      inputHTMLElement = document.getElementById(props.name);
    }
    if (inputHTMLElement) {
      inputHTMLElement.setAttribute("value", stringify(nextValue));
    }
  };

  const handleSpinStart = (parity: 1 | -1) => () => {
    handleArrowSpin(parity)();
    updateInputElementValue(currentValue);

    if (!spinIntervalDelayTimeout) {
      spinIntervalDelayTimeout = setTimeout(() => {
        if (!spinIntervalTimeout) {
          spinIntervalTimeout = setInterval(() => {
            handleArrowSpin(parity)();
            updateInputElementValue(currentValue);
          }, NUMBER_INPUT_SPINNER_ITERATION_INTERVAL_MS);
        }
      }, NUMBER_INPUT_SPINNER_DELAY_INTERVAL_MS);
    }
  };
  const handleSpinEnd = () => {
    if (spinIntervalDelayTimeout) {
      clearInterval(spinIntervalDelayTimeout);
      spinIntervalDelayTimeout = null;
      if (!spinIntervalTimeout) {
        commitChangedValue();
      }
    }
    if (spinIntervalTimeout) {
      clearInterval(spinIntervalTimeout);
      commitChangedValue();
      spinIntervalTimeout = null;
    }
  };
  const handleSpinStartUp = handleSpinStart(1);
  const handleSpinStartDown = handleSpinStart(-1);

  const arrowCustomStyle = sx({
    height: "14px",
    fontSize: "10px",
    fontWeight: 700,
  });
  const arrowCustomNotDisabledStyle = sx({
    cursor: "pointer",
    backgroundColor: theme.color.backgroundElevation,
    color: theme.color.secondary,
  });
  const arrowCustomUpStyle = sx({
    borderLeft: `1px solid ${theme.color.secondary}`,
  });
  const arrowCustomDownStyle = sx({
    borderLeft: `1px solid ${theme.color.secondary}`,
    borderTop: `1px solid ${theme.color.secondary}`,
  });
  const arrowCustomHoverStyle = sx(
    {
      backgroundColor: theme.color.secondary,
      color: "#000000",
    },
    ":hover"
  );
  const arrowCustomFocusStyle = sx(
    {
      backgroundColor: theme.color.secondary,
      color: "#000000",
    },
    ":focus"
  );
  const upArrow = div(
    [
      arrowCustomStyle,
      isValueMax ? numberInputSpinnerDisabled : arrowCustomNotDisabledStyle,
      arrowCustomUpStyle,
      !isValueMax && arrowCustomHoverStyle,
      !isValueMax && arrowCustomFocusStyle,
    ],
    "+",
    undefined,
    {
      // @ts-ignore
      onmousedown: () => {
        if (!isValueMax) {
          handleSpinStartUp();
        }
      },
      // @ts-ignore
      onmouseup: handleSpinEnd,
    }
  );
  const downArrow = div(
    [
      arrowCustomStyle,
      isValueMin ? numberInputSpinnerDisabled : arrowCustomNotDisabledStyle,
      arrowCustomDownStyle,
      !isValueMin && arrowCustomHoverStyle,
      !isValueMin && arrowCustomFocusStyle,
    ],
    "-",
    undefined,
    {
      // @ts-ignore
      onmousedown: () => {
        if (!isValueMin) {
          handleSpinStartDown();
        }
      },
      // @ts-ignore
      onmouseup: handleSpinEnd,
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
  const inputBaseElement = inputBase({
    ...props,
    type: "number",
    // @ts-ignore
    classname: cx(
      baseStyle,
      validStyle,
      invalidStyle,
      inputBaseNotFocus,
      inputBaseInvalidFocus,
      inputBaseFocus,
      !showDefaultArrows && hideArrowsClassname,
      props.classname
    ),
    after: showCustomArrows && afterArrows,
    value: stringify(props.value),
    inputMode: inputMode,
  });

  return inputBaseElement;
};

export default { numberInput };
