import {
  createElement,
  sy,
  cx,
  sx,
  getTheme,
  addCx,
  removeCx,
  getThemeStyles,
  ax,
  INPUT_INVALID,
  staticStyles,
  cxFlat,
} from "@eofol/eofol";
import {
  Disablable,
  EComponentWithoutChildren,
  InputHandlers,
  Namable,
  Schemable,
} from "@eofol/eofol-types";

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
  readonly,
  disabled,
  scheme,
}: {
  value?: string;
  resize?: Resize;
  readonly?: boolean;
} & InputHandlers<string> &
  Disablable &
  Schemable &
  Namable &
  EComponentWithoutChildren) => {
  const theme = getTheme();
  const themeStyles = getThemeStyles();
  const schemeImpl = scheme ?? "secondary";
  const flatClassname = cxFlat(classname);

  const isInvalid = (!flatClassname ? "" : flatClassname)
    .split(" ")
    .includes(INPUT_INVALID);

  const validBorderStyle = themeStyles.inputBorder[schemeImpl];
  const invalidBorderStyle = themeStyles.inputErrorBorderFlat;
  const validFocusStyle = themeStyles.inputFocusFlat[schemeImpl];
  const invalidFocusStyle = themeStyles.inputErrorFocusFlat;
  const baseOutlineStyle = themeStyles.inputBaseOutline;

  const wrapperElement = createElement(
    "div",
    [
      sx({
        padding: "8px 8px 8px 8px",
        backgroundColor: theme.color.background.elevation,
        cursor: "text",
      }),
      themeStyles.inputBaseOutlineTransition,
      isInvalid && INPUT_INVALID,
      isInvalid ? invalidBorderStyle : validBorderStyle,
      baseOutlineStyle,
    ],
    undefined,
    { id: "textarea-wrapper-" + name }
  );

  const baseStyle = sx({
    cursor: "text",
    marginRight: 0,
    padding: "0 0 0 0",
    fontSize: theme.typography.text.fontSize,
    fontFamily: "inherit",
    backgroundColor: theme.color.background.elevation,
    color: theme.color.secondary.base,
    border: "none",
  });

  const textareaElement = createElement(
    "textarea",
    cx(
      baseStyle,
      staticStyles.full,
      getResizeClass(resize),
      textAreaBaseClass,
      sx({ outline: "none" }, ":focus"),
      flatClassname
    ),
    value,
    ax(
      {
        "aria-label": name,
        id: name,
        name,
      },
      ["disabled", disabled],
      ["readonly", readonly]
    ),
    {
      // @ts-ignore
      onchange: (e) => {
        onChange(e.target.value);
      },
      // @ts-ignore
      onfocus: () => {
        const element = document.getElementById("textarea-wrapper-" + name);
        removeCx(element, validFocusStyle, invalidFocusStyle, baseOutlineStyle);
        addCx(element, isInvalid ? invalidFocusStyle : validFocusStyle);
      },
      // @ts-ignore
      onblur: (e) => {
        const element = document.getElementById("textarea-wrapper-" + name);
        removeCx(element, validFocusStyle, invalidFocusStyle);
        addCx(element, baseOutlineStyle);

        if (onBlur) {
          onBlur(e.target.value);
        }
      },
    }
  );

  wrapperElement.appendChild(textareaElement);

  return wrapperElement;
};

export default textarea;
