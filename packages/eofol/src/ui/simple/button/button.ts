import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EButton, EComponent, ESizable, getSize } from "../../types";

const button = ({
  onClick,
  onBlur,
  size,
  full,
  disabled,
  styles,
  children,
}: {
  full?: boolean;
} & EButton & ESizable & EComponent) => {
  const element = createElement(
    "button",
    cx(
      "button-base",
      getSize("button")(size),
      full && "button-full",
      disabled && "button-disabled",
      styles
    ),
    children,
    ax({}, ["disabled", disabled])
  );
  // @ts-ignore
  element.onclick = onClick;
  // @ts-ignore
  element.onblur = onBlur;
  return element;
};

export default button;
