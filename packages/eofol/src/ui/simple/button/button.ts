import createElement from "../../../core/create-element";
import { ax, cx } from "../../../util/simple";
import { EComponent, getSize, SIZE } from "../../types";

const button = ({
  onClick,
  onBlur,
  size,
  full,
  disabled,
  styles,
  children,
}: {
  onClick?: () => void;
  onBlur?: () => void;
  size?: SIZE;
  full?: boolean;
  disabled?: boolean;
} & EComponent) => {
  const element = createElement(
    "button-base",
    cx(
      "button",
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
