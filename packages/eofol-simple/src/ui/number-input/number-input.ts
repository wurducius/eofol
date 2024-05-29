import { NumberInputProps, SIZE } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import {
  getTheme,
  sx,
  cx,
  addCx,
  removeCx,
  getThemeStyles,
} from "@eofol/eofol";
import div from "../../primitive/div";
import { getInputSizeStyle } from "../../util/inputs";
import img from "../img/img";

const NUMBER_INPUT_SPINNER_DELAY_INTERVAL_MS = 300;

const NUMBER_INPUT_SPINNER_ITERATION_INTERVAL_MS = 50;

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

const getCustomArrowSize = (size: SIZE) => {
  if (size === "xl") {
    return 26;
  } else if (size === "sm") {
    return 14;
  } else if (size === "lg") {
    return 22;
  } else {
    return 18;
  }
};

const getCustomArrowFontSize = (size: SIZE) => {
  if (size === "xl") {
    return 14;
  } else if (size === "sm") {
    return 8;
  } else if (size === "lg") {
    return 12;
  } else {
    return 10;
  }
};

const numberInput = (props: NumberInputProps) => {
  const theme = getTheme();
  const themeStyles = getThemeStyles();

  const showCustomArrows = !props.hideArrows;
  const hideDefaultArrows = props.hideArrows !== "default";

  const arrowUpIcon = props.arrowUpIcon;
  const arrowDownIcon = props.arrowDownIcon;

  const arrowClassname = props.arrowClassname;

  const allowOutOfRange = props.allowOutOfRange;

  const precision = props.precision;

  const inputMode = props.inputMode ?? NUMBER_INPUT_DEFAULT_INPUT_MODE;

  const invalidExplicit = props.invalid;

  const formatProp = props.format;
  const parseProp = props.parse;

  const stringify = stringifyValue(precision, formatProp);
  const parse = parseValue(precision, parseProp);

  const schemeImpl = props.scheme ?? "secondary";

  const baseStyle = themeStyles.inputBase;
  const colorStyle = themeStyles.color[schemeImpl];
  const baseTransitionStyle = themeStyles.inputBaseOutlineTransition;
  const sizeStyle = getInputSizeStyle(props.size);
  const invalidStyle = themeStyles.inputErrorBorder;
  const validStyle = themeStyles.inputBorder[schemeImpl];
  const inputBaseNotFocus = themeStyles.inputBaseOutline;
  const inputBaseFocus = themeStyles.inputFocus[schemeImpl];
  const inputBaseInvalidFocus = themeStyles.inputErrorFocus;
  const numberInputSpinnerDisabled = themeStyles.inputDisabled;

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

  const arrowSize = getCustomArrowSize(props.size);

  const arrowCustomStyle = (size: SIZE) =>
    sx({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: `${getCustomArrowSize(size)}px`,
      fontSize: `${getCustomArrowFontSize(size)}px`,
      fontWeight: 700,
    });
  const arrowCustomNotDisabledStyle = sx({
    cursor: "pointer",
    backgroundColor: theme.color.background.elevation,
    color: theme.color.secondary.base,
  });
  const arrowCustomUpStyle = sx({
    borderLeft: `1px solid ${theme.color.secondary.base}`,
  });
  const arrowCustomDownStyle = sx({
    borderLeft: `1px solid ${theme.color.secondary.base}`,
    borderTop: `1px solid ${theme.color.secondary.base}`,
  });
  const arrowCustomHoverStyle = sx(
    {
      backgroundColor: theme.color.secondary.base,
      color: "#000000",
    },
    ":hover"
  );
  const arrowCustomFocusStyle = sx(
    {
      backgroundColor: theme.color.secondary.base,
      color: "#000000",
    },
    ":focus"
  );
  const upArrow = div(
    [
      arrowCustomStyle(props.size),
      isValueMax ? numberInputSpinnerDisabled : arrowCustomNotDisabledStyle,
      arrowCustomUpStyle,
      !isValueMax && arrowCustomHoverStyle,
      !isValueMax && arrowCustomFocusStyle,
      arrowClassname,
    ],
    arrowUpIcon
      ? img({
          src: arrowUpIcon,
          alt: "Increment",
          height: `${arrowSize}px`,
          width: `${arrowSize}px`,
        })
      : "+",
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
      arrowCustomStyle(props.size),
      isValueMin ? numberInputSpinnerDisabled : arrowCustomNotDisabledStyle,
      arrowCustomDownStyle,
      !isValueMin && arrowCustomHoverStyle,
      !isValueMin && arrowCustomFocusStyle,
      arrowClassname,
    ],
    arrowDownIcon
      ? img({
          src: arrowDownIcon,
          alt: "Decrement",
          height: `${arrowSize}px`,
          width: `${arrowSize}px`,
        })
      : "-",
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
      height: `${2 * getCustomArrowSize(props.size)}px`,
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
      baseTransitionStyle,
      colorStyle,
      sizeStyle,
      validStyle,
      invalidStyle,
      inputBaseNotFocus,
      inputBaseInvalidFocus,
      inputBaseFocus,
      hideDefaultArrows && "number-input-hide-arrows",
      props.classname
    ),
    after: showCustomArrows && afterArrows,
    value: props.value ? stringify(props.value) : undefined,
    inputMode: inputMode,
  });

  return inputBaseElement;
};

export default numberInput;
