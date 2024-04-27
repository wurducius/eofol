import { createElement, sy, cx } from "@eofol/eofol";

const textAreaBaseClass = sy(
  {
    overflowY: "scroll",
  },
  "textarea-base"
);

type Resize = "both" | "horizontal" | "vertical" | "none" | undefined;

const textAreaResizeBothClass = sy(
  { resize: "both" },
  "textarea-base-resize-both"
);
const textAreaResizeHorizontalClass = sy(
  { resize: "horizontal" },
  "textarea-base-resize-horizontal"
);
const textAreaResizeVerticalClass = sy(
  { resize: "vertical" },
  "textarea-base-resize-vertical"
);
const textAreaResizeNoneClass = sy(
  { resize: "none" },
  "textarea-base-resize-none"
);

const getResizeClass = (resize: Resize) => {
  if (resize === "both") {
    return textAreaResizeBothClass;
  }
  if (resize === "horizontal") {
    return textAreaResizeHorizontalClass;
  }
  if (resize === "vertical") {
    return textAreaResizeVerticalClass;
  }
  return textAreaResizeNoneClass;
};

export const textarea = ({
  name,
  value,
  onChange,
  onBlur,
  classname,
  resize,
}: {
  name: string;
  value?: string;
  onChange: (nextVal: string) => void;
  onBlur?: (nextVal: string) => void;
  classname?: string;
  resize?: Resize;
}) =>
  createElement(
    "textarea",
    cx(getResizeClass(resize), textAreaBaseClass, classname),
    value,
    {
      "aria-label": name,
      id: name,
      name,
    },
    {
      // @ts-ignore
      onchange: (e) => {
        onChange(e.target.value);
      },
      // @ts-ignore
      onblur: (e) => {
        if (onBlur) {
          onBlur(e.target.value);
        }
      },
    }
  );

export default { textarea };
