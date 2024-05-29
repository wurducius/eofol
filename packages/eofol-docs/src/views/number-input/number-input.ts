import { numberInput, h2, p, h1, h3 } from "@eofol/eofol-simple";
import { capitalize, toCamel, toInputName } from "../../util";
import { getTheme, sx } from "@eofol/eofol";
import { shortLoremIpsum, loremIpsum } from "../../data";
import { inputField, page } from "../../ui";

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

const theme = getTheme();

const propTitleStyle = sx({ color: theme.color.secondary.base });

const name = toInputName(COMPONENT);

const defaultProps = {
  onChange: noop,
  value: NUMBER_INPUT_VALUE,
};

const props = (propsObj: any) => ({
  ...defaultProps,
  ...propsObj,
});

type PropValue = { value: any; title: string };

const renderPropValueItem = (
  propName: string,
  propValue: PropValue,
  additionalProps?: (propName: string, value: string) => any
) => {
  console.log({ [toCamel(propName)]: propValue.value });
  return render({
    [toCamel(propName)]: propValue.value,
    ...(additionalProps ? additionalProps(propName, propValue.value) : {}),
  });
};

const renderPropValues = (
  propName: string,
  propValues: PropValue[] | PropValue,
  additionalProps?: (propName: string, value: string) => any
) => {
  if (Array.isArray(propValues)) {
    return propValues
      .map((propValue) => [
        h3(capitalize(propValue.title ?? propValue.value)),
        renderPropValueItem(propName, propValue, additionalProps),
      ])
      .flat();
  } else {
    return [renderPropValueItem(propName, propValues, additionalProps)];
  }
};

const renderProp = (
  propName: string,
  description: string,
  propValues: PropValue[] | PropValue,
  additionalProps?: (propName: string, value: string) => any
) => [
  h2(capitalize(propName), propTitleStyle),
  p(description),
  ...renderPropValues(propName, propValues, additionalProps),
];

const render = (propsObj: any) => inputField(numberInput(props(propsObj)));

const renderGroup = (
  propName: string,
  description: string,
  propData: any,
  additionalProps?: any
) =>
  renderProp(propName, description, propData, (propName, value) => ({
    name: name(propName, value),
    ...additionalProps,
  }));

// --------------------------

const schemeData = [
  { title: "Primary", value: "primary" },
  { title: "Secondary", value: "secondary" },
  { title: "Tertiary", value: "tertiary" },
];

const sizeData = [
  { title: "Small", value: "sm" },
  { title: "Middle", value: "md" },
  { title: "Large", value: "lg" },
  { title: "Extra large", value: "xl" },
];

const placeholderData = [{ title: "Placeholder", value: "Placeholder" }];

const minData = [{ title: "Min", value: NUMBER_INPUT_VALUE }];

const maxData = [{ title: "Max", value: NUMBER_INPUT_VALUE }];

const stepData = [{ title: "Step", value: 10 }];

const hideArrowsData = [
  { title: "Custom", value: false },
  { title: "Default", value: "default" },
  { title: "Hidden", value: true },
];

const scheme = renderGroup("Scheme", shortLoremIpsum, schemeData);

const size = renderGroup("Size", shortLoremIpsum, sizeData);

const placeholder = renderGroup(
  "Placeholder",
  shortLoremIpsum,
  placeholderData,
  { value: undefined }
);

const min = renderGroup("Min", shortLoremIpsum, minData);

const max = renderGroup("Max", shortLoremIpsum, maxData);

const step = renderGroup("Step", shortLoremIpsum, stepData);

const hideArrows = renderGroup("Hide arrows", shortLoremIpsum, hideArrowsData);

const contentElement = [
  h1(capitalize(COMPONENT)),
  p(loremIpsum),
  render({ name: name("base") }),
  ...scheme,
  ...size,
  ...placeholder,
  ...min,
  ...max,
  ...step,
  ...hideArrows,
];

page(contentElement);
