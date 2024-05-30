import { numberInput, p, h1 } from "@eofol/eofol-simple";
import { capitalize, noop } from "../../util";
import { shortLoremIpsum, loremIpsum } from "../../data";
import { inputField, page } from "../../ui";
import { renderInputPropsView } from "../../book";

const NUMBER_INPUT_VALUE = 42;

const componentName = "Number input";

const componentElement = (x: any) => inputField(numberInput(x));

const defaultProps = {
  onChange: noop,
  value: NUMBER_INPUT_VALUE,
};

const data = [
  {
    name: "Scheme",
    description: shortLoremIpsum,
    data: [
      { title: "Primary", value: "primary" },
      { title: "Secondary", value: "secondary" },
      { title: "Tertiary", value: "tertiary" },
    ],
  },
  {
    name: "Size",
    description: shortLoremIpsum,
    data: [
      { title: "Small", value: "sm" },
      { title: "Middle", value: "md" },
      { title: "Large", value: "lg" },
      { title: "Extra large", value: "xl" },
    ],
  },
  {
    name: "Placeholder",
    description: shortLoremIpsum,
    data: { title: "Placeholder", value: "Placeholder" },
    additionalProps: { value: undefined },
  },
  {
    name: "Min",
    description: shortLoremIpsum,
    data: { title: "Min", value: NUMBER_INPUT_VALUE },
  },
  {
    name: "Max",
    description: shortLoremIpsum,
    data: { title: "Max", value: NUMBER_INPUT_VALUE },
  },
  {
    name: "Step",
    description: shortLoremIpsum,
    data: { title: "Step", value: 10 },
  },
  {
    name: "Hide arrows",
    description: shortLoremIpsum,
    data: [
      { title: "Custom", value: false },
      { title: "Default", value: "default" },
      { title: "Hidden", value: true },
    ],
  },
];

const props = renderInputPropsView(
  componentName,
  componentElement,
  data,
  defaultProps
);

const contentElement = [
  h1(capitalize(componentName)),
  p(loremIpsum),
  componentElement(defaultProps),
  ...props,
];

page(contentElement);
