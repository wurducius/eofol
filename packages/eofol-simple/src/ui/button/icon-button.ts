import { ax, createElement, cx, cxFlat, sy } from "@eofol/eofol";
import { IconButtonProps } from "@eofol/eofol-types";
import { buttonBase } from "./button-base";

const baseIconButtonStyle = sy(
  { display: "inline-flex", alignItems: "center" },
  "icon-button-base"
);

const iconButton = (props: IconButtonProps) => {
  // @TODO
  const active = false;
  const variant = "solid";

  const { iconPosition, iconMargin, icon, alt, disabled, title } = props;

  const isIconPositionLeft = !iconPosition || iconPosition === "left";

  const iconMarginImpl = iconMargin ?? "8px";
  const iconStyleLeft = sy(
    {
      height: "24px",
      width: "24px",
      marginRight: iconMarginImpl,
      marginLeft: "0",
    },
    "iconbutton-img-left"
  );
  const iconStyleRight = sy(
    {
      height: "24px",
      width: "24px",
      marginRight: "0",
      marginLeft: iconMarginImpl,
    },
    "iconbutton-img-right"
  );
  const iconElement = createElement(
    "img",
    isIconPositionLeft ? iconStyleLeft : iconStyleRight,
    undefined,
    ax(
      {
        src: icon,
        alt,
      },
      ["disabled", disabled]
    )
  );
  const titleElement = title ?? "";

  const content = (
    isIconPositionLeft
      ? [iconElement, titleElement]
      : [titleElement, iconElement]
  ).filter(Boolean);

  return buttonBase({
    ...props,
    active,
    variant,
    children: content,
    classname: cx([cxFlat(props.classname), baseIconButtonStyle]),
  });
};

export default iconButton;
