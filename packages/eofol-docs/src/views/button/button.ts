import { button } from "@eofol/eofol-simple";
import { noop } from "../../util";
import { shortLoremIpsum, loremIpsum } from "../../data";
import { page } from "../../ui";
import { renderPropsPage } from "../../book";

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
];

page(
  renderPropsPage(
    componentName,
    loremIpsum,
    data,
    componentElement,
    defaultProps
  )
);
