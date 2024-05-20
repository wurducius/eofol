import { ax, createElement, sy } from "@eofol/eofol";

const iconButton = ({
  icon,
  onClick,
  title,
  alt,
  disabled,
  classname,
}: {
  icon: string;
  onClick: () => void;
  title?: string;
  alt: string;
  disabled?: boolean;
  classname?: string;
}) => {
  return createElement(
    "button",
    [
      sy(
        {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        },
        "iconbutton-base"
      ),
      classname ?? "",
    ],
    [
      createElement(
        "img",
        sy(
          { height: "24px", width: "24px", marginRight: title ? "8px" : "0" },
          "iconbutton-img"
        ),
        undefined,
        ax(
          {
            src: icon,
            alt,
          },
          ["disabled", disabled]
        )
      ),
      title ?? "",
    ].filter(Boolean),
    undefined,
    {
      // @ts-ignore
      onclick: onClick,
    }
  );
};

export default iconButton;
