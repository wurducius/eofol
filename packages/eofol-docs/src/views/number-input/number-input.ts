import { div, numberInput, h2, p, h1 } from "@eofol/eofol-simple";
import { sx } from "@eofol/eofol";
import { shortLoremIpsum, loremIpsum, page } from "../../ui";
import { capitalize, toInputName } from "../../util";

/*
  inputMode?: InputMode;
  precision?: number;
  pattern?: string;
  required?: boolean;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  spellcheck?: boolean;
  autocomplete?: boolean;
  */

const COLOR_SCHEME_PRIMARY = "primary";
const COLOR_SCHEME_SECONDARY = "secondary";
const COLOR_SCHEME_TERTIARY = "tertiary";

const SIZE_SM = "sm";
const SIZE_MD = "md";
const SIZE_LG = "lg";
const SIZE_XL = "xl";

const SIZE_SM_NAME = "Small";
const SIZE_MD_NAME = "Middle";
const SIZE_LG_NAME = "Large";
const SIZE_XL_NAME = "Extra large";

const noop = () => {};
const NUMBER_INPUT_VALUE = 42;

const COMPONENT = "Number input";

const PROP_SCHEME = "scheme";
const PROP_SIZE = "size";
const PROP_PLACEHOLDER = "placeholder";
const PROP_MIN = "min";
const PROP_MAX = "max";
const PROP_HIDE_ARROWS = "hide arrows";

const name = (propName: string, propVal?: string) => toInputName(COMPONENT);

const defaultProps = { onChange: noop, value: NUMBER_INPUT_VALUE };

const inputField = (element: Element) =>
  div(sx({ width: "240px", margin: "32px auto 32px auto" }), element);

// Partial<NumberInputProps>

const props = (propsObj: any) => ({
  ...defaultProps,
  ...propsObj,
});

type PropValue = { value: any; title?: string };

const renderPropValues = (
  propName: string,
  propValues: PropValue[] | PropValue,
  additionalProps?: (propName: string, value: string) => any
) => {
  if (Array.isArray(propValues)) {
    return propValues
      .map((propValue) => [
        p(capitalize(propValue.title ?? propValue.value)),
        render({
          [propName]: propValue.value,
          ...(additionalProps
            ? additionalProps(propName, propValue.value)
            : {}),
        }),
      ])
      .flat();
  } else {
    return [
      render({
        [propName]: propValues.value,
        ...(additionalProps ? additionalProps(propName, propValues.value) : {}),
      }),
    ];
  }
};

const renderProp = (
  propName: string,
  description: string,
  propValues: PropValue[] | PropValue,
  additionalProps?: (propName: string, value: string) => any
) => [
  h2(capitalize(propName)),
  p(description),
  ...renderPropValues(propName, propValues, additionalProps),
];

const render = (propsObj: any) => inputField(numberInput(props(propsObj)));

// --------------------------

const scheme = [
  h2(capitalize(PROP_SCHEME)),
  p(shortLoremIpsum),
  p(capitalize(COLOR_SCHEME_PRIMARY)),
  render({
    name: name(PROP_SCHEME, COLOR_SCHEME_PRIMARY),
    scheme: COLOR_SCHEME_PRIMARY,
  }),
  p(capitalize(COLOR_SCHEME_SECONDARY)),
  render({
    name: name(PROP_SCHEME, COLOR_SCHEME_SECONDARY),
    scheme: COLOR_SCHEME_SECONDARY,
  }),
  p(capitalize(COLOR_SCHEME_TERTIARY)),
  render({
    name: name(PROP_SCHEME, COLOR_SCHEME_TERTIARY),
    scheme: COLOR_SCHEME_TERTIARY,
  }),
];

const size = [
  h2(capitalize(PROP_SIZE)),
  p(shortLoremIpsum),
  p(capitalize(SIZE_SM_NAME)),
  render({
    name: name(PROP_SIZE, SIZE_SM_NAME),
    size: SIZE_SM,
  }),
  p(capitalize(SIZE_MD_NAME)),
  render({
    name: name(PROP_SIZE, SIZE_MD_NAME),
    size: SIZE_MD,
  }),
  p(capitalize(SIZE_LG_NAME)),
  render({
    name: name(PROP_SIZE, SIZE_LG_NAME),
    size: SIZE_LG,
  }),
  p(capitalize(SIZE_XL_NAME)),
  render({
    name: name(PROP_SIZE, SIZE_XL_NAME),
    size: SIZE_XL,
  }),
];

const placeholder = [
  h2(capitalize(PROP_PLACEHOLDER)),
  p(shortLoremIpsum),
  render({
    name: name(PROP_PLACEHOLDER, undefined),
    placeholder: "Placeholder",
    value: undefined,
  }),
];

const min = [
  h2("Min"),
  inputField(
    numberInput({
      name: "number-input-min",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      min: NUMBER_INPUT_VALUE,
    })
  ),
];

const max = [
  h2("Max"),
  inputField(
    numberInput({
      name: "number-input-max",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      max: NUMBER_INPUT_VALUE,
    })
  ),
];

const step = [
  h2("Step"),
  inputField(
    numberInput({
      name: "number-input-step",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      step: 10,
    })
  ),
];

const hideArrows = [
  h2("Hide arrows"),
  p("Custom visible"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-visible",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      hideArrows: false,
    })
  ),
  p("Default visible"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-default",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      hideArrows: "default",
    })
  ),
  p("Hidden"),
  inputField(
    numberInput({
      name: "number-input-hide-arrows-hidden",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
      hideArrows: true,
    })
  ),
];

const contentElement = [
  h1(capitalize(COMPONENT)),
  p(loremIpsum),
  inputField(
    numberInput({
      name: "number-input-base",
      onChange: noop,
      value: NUMBER_INPUT_VALUE,
    })
  ),
  ...scheme,
  ...size,
  ...placeholder,
  ...min,
  ...max,
  ...step,
  ...hideArrows,
];

page(contentElement);
