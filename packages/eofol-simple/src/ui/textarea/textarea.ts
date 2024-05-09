import {
  createElement,
  sy,
  cx,
  sx,
  getTheme,
  addCx,
  removeCx,
} from "@eofol/eofol";

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
}) => {
  const theme = getTheme();

  const isInvalid = classname?.split(" ").includes("input-invalid");

  const validStyle = sx({
    border: `1px solid ${
      isInvalid ? theme.color.error : theme.color.secondary
    }`,
  });
  const focusStyle = sx({ outline: `2px solid ${theme.color.secondary}` });
  const invalidFocusStyle = sx({ outline: `2px solid #fc8181` });

  const wrapperElement = createElement(
    "div",
    [
      sx({
        padding: "8px 8px 8px 8px",
        backgroundColor: theme.color.backgroundElevation,
        cursor: "text",
      }),
      validStyle,
    ],
    undefined,
    { id: "textarea-wrapper-" + name }
  );

  const baseStyle = sx({
    cursor: "text",
    marginRight: 0,
    padding: "0 0 0 0",
    fontSize: theme.typography.text.fontSize,
    width: "100%",
    backgroundColor: theme.color.backgroundElevation,
    color: theme.color.secondary,
    border: "none",
  });

  const textareaElement = createElement(
    "textarea",
    cx(
      baseStyle,
      getResizeClass(resize),
      textAreaBaseClass,
      sx({ outline: "none" }, ":focus"),
      classname
    ),
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
      onfocus: () => {
        const element = document.getElementById("textarea-wrapper-" + name);
        addCx(element, isInvalid ? invalidFocusStyle : focusStyle);
      },
      // @ts-ignore
      onblur: (e) => {
        const element = document.getElementById("textarea-wrapper-" + name);
        removeCx(element, invalidFocusStyle, focusStyle);

        if (onBlur) {
          onBlur(e.target.value);
        }
      },
    }
  );

  wrapperElement.appendChild(textareaElement);

  return wrapperElement;
};

export default { textarea };
