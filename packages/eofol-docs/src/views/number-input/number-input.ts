import { numberInput } from "@eofol/eofol-simple";
import { noop } from "../../util";
import { shortLoremIpsum, loremIpsum } from "../../data";
import { inputField, page } from "../../ui";
import { renderInputPropsPage } from "../../book";

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
    default: "Primary",
  },
  {
    name: "Size",
    description: shortLoremIpsum,
    data: [
      { title: "Small", value: "sm" },
      { title: "Medium", value: "md" },
      { title: "Large", value: "lg" },
      { title: "Extra large", value: "xl" },
    ],
    default: "Medium",
  },
  {
    name: "Placeholder",
    description: shortLoremIpsum,
    data: { title: "Placeholder", value: "Placeholder" },
    additionalProps: { value: undefined },
    default: '""',
  },
  {
    name: "Min",
    description: shortLoremIpsum,
    data: { title: "Min", value: NUMBER_INPUT_VALUE },
    default: "undefined",
  },
  {
    name: "Max",
    description: shortLoremIpsum,
    data: { title: "Max", value: NUMBER_INPUT_VALUE },
    default: "undefined",
  },
  {
    name: "Step",
    description: shortLoremIpsum,
    data: { title: "Step", value: 10 },
    default: "1",
  },
  {
    name: "Hide arrows",
    description: shortLoremIpsum,
    data: [
      { title: "Custom", value: false },
      { title: "Default", value: "default" },
      { title: "Hidden", value: true },
    ],
    default: "Custom",
  },
];

page(
  renderInputPropsPage(
    componentName,
    loremIpsum,
    data,
    componentElement,
    defaultProps
  )
);
