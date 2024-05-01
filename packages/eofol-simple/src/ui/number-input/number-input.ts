import { NumberInputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";

const numberInput = (props: NumberInputProps) => {
  const hideArrows = props.hideArrows;
  const arrowStyle = props.arrowStyle;
  // @TODO: typing
  // @ts-ignore
  return inputBase({
    ...props,
    type: "number",
    // @ts-ignore
    classname: [hideArrows && "number-input-hide-arrows", props.classname]
      .flat()
      .filter(Boolean),
  });
};

export default { numberInput };
