import { ax, createElement, cx, getTheme, sx, sy } from "@eofol/eofol";
import { InputBaseProps } from "@eofol/eofol-types";

const checkValidity = (validation: any, nextVal: any) => {
  // @ts-ignore
  return validation.reduce(
    // @ts-ignore
    (acc, next) => (acc !== true ? acc : next(nextVal)),
    true
  ) as string | true;
};

export const inputBase = ({
  value,
  onChange,
  onBlur,
  onInput,
  onFocus,
  onInvalid,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onPaste,
  classname,
  name,
  type,
  placeholder,
  max,
  min,
  step,
  pattern,
  required,
  readonly,
  minLength,
  maxLength,
  disabled,
  spellcheck,
  autocomplete,
  validation,
}: InputBaseProps) => {
  const theme = getTheme();

  sy({ border: `1px solid ${theme.color.error}` }, "input-base-invalid");

  const inputBaseInvalidFocus = sx(
    { outline: `2px solid ${theme.color.error}` },
    "focus"
  );

  const validityElement = createElement(
    "div",
    sx({
      display: "none",
      position: "absolute",
      color: "#fc8181",
      backgroundColor: "#111111",
      fontSize: "16px",
      width: "calc(100% - 12px)",
      border: "1px solid #dddddd",
      padding: "6px 6px 6px 6px",
      zIndex: theme.zIndex.dropdown,
    }),
    undefined
  );

  const inputElement = createElement(
    "input",
    cx(
      sx({
        position: "relative",
        width:
          type === "text" || type === "number" ? "calc(100% - 22px)" : "100%",
      }),
      classname
    ),
    undefined,
    ax(
      { value },
      ["name", name],
      ["id", name],
      ["aria-label", name],
      ["type", type],
      ["placeholder", placeholder],
      ["min", min],
      ["max", max],
      ["step", step],
      ["pattern", pattern],
      ["required", required],
      ["readonly", readonly],
      ["minLength", minLength],
      ["maxLength", maxLength],
      ["disabled", disabled],
      ["spellcheck", spellcheck || "false"],
      ["autocomplete", autocomplete || "false"]
    )
  );

  if (onBlur) {
    inputElement.onblur = (e) => {
      // @ts-ignore
      onBlur(e.target.value);
    };
  }

  if (onFocus) {
    inputElement.onfocus = (e) => {
      // @ts-ignore
      onFocus(e.target.value);
    };
  }

  if (onInvalid) {
    inputElement.oninvalid = (e) => {
      // @ts-ignore
      onInvalid(e.target.value);
    };
  }

  if (onKeyDown) {
    inputElement.onkeydown = (e) => {
      // @ts-ignore
      onKeyDown(e);
    };
  }

  if (onKeyUp) {
    inputElement.onkeyup = (e) => {
      // @ts-ignore
      onKeyUp(e);
    };
  }

  if (onKeyPress) {
    inputElement.onkeypress = (e) => {
      // @ts-ignore
      onKeyPress(e);
    };
  }

  if (onPaste) {
    inputElement.onpaste = (e) => {
      // @ts-ignore
      onPaste(e);
    };
  }

  inputElement.onchange = (e) => {
    // @ts-ignore
    const nextVal = e.target.value;

    if (validation) {
      const validity = checkValidity(validation, nextVal);

      if (validity !== true) {
        return;
      }
    }

    if (onChange) {
      // @ts-ignore
      onChange(nextVal);
    }
  };

  inputElement.oninput = (e) => {
    // @ts-ignore
    const nextVal = e.target.value;

    if (validation) {
      // @ts-ignore
      const validity = checkValidity(validation, nextVal);

      if (validity === true) {
        validityElement.setAttribute("style", "display: none;");
        inputElement.className = inputElement.className
          .split(" ")
          .filter(
            (item) =>
              item !== "input-base-invalid" && item !== inputBaseInvalidFocus
          )
          .join(" ");
      } else {
        validityElement.setAttribute("style", "display: block;");
        validityElement.textContent = validity;
        inputElement.className =
          inputElement.className +
          " input-base-invalid " +
          inputBaseInvalidFocus;
      }

      return;
    }

    if (onInput) {
      onInput(nextVal);
    }
  };

  return createElement("div", sx({ position: "relative", width: "100%" }), [
    inputElement,
    validityElement,
  ]);
};

export default { inputBase };
