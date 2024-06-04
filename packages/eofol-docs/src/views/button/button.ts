import { button } from "@eofol/eofol-simple";
import { noop } from "../../util";
import { shortLoremIpsum, loremIpsum } from "../../data";
import { page } from "../../ui";
import { renderInputPropsPage } from "../../book";

const componentName = "Button";

const componentElement = (x: any) => button(x);

const defaultProps = {
  onClick: noop,
  children: "Button",
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
      { title: "Small", value: "sm", additionalProps: { children: "Small" } },
      { title: "Medium", value: "md", additionalProps: { children: "Medium" } },
      { title: "Large", value: "lg", additionalProps: { children: "Large" } },
      {
        title: "Extra large",
        value: "xl",
        additionalProps: { children: "Extra large" },
      },
    ],
    default: "Medium",
  },
  {
    name: "Variant",
    description: shortLoremIpsum,
    data: [
      { title: "Outline", value: "outline" },
      { title: "Solid", value: "solid" },
      { title: "Ghost", value: "ghost" },
    ],
    default: "Outline",
  },
  {
    name: "Active",
    description: shortLoremIpsum,
    data: [{ title: "True", value: "true" }],
    default: "False",
  },
  {
    name: "Disabled",
    description: shortLoremIpsum,
    data: [{ title: "Disabled", value: "true" }],
    default: "False",
  },
  {
    name: "Full",
    description: shortLoremIpsum,
    data: [{ title: "True", value: "true" }],
    default: "False",
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
