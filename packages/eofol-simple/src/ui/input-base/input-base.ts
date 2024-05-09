import {
  addCx,
  ax,
  createElement,
  cx,
  getTheme,
  removeCx,
  sx,
  sy,
} from "@eofol/eofol";
import { EofolElementNode, InputBaseProps } from "@eofol/eofol-types";
import div from "../primitive/div";
import { INPUT_INVALID } from "../../util/validation";

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
  after,
}: InputBaseProps) => {
  const theme = getTheme();

  const isInvalid = (classname ?? "").split(" ").includes(INPUT_INVALID);

  const inputBaseWrapperStyle = sy(
    { position: "relative", width: "100%" },
    "input-base-wrapper"
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
        removeCx(inputElement, INPUT_INVALID);
        addCx(inputElement);
      } else {
        validityElement.setAttribute("style", "display: block;");
        validityElement.textContent = validity;
        removeCx(inputElement);
        addCx(inputElement, INPUT_INVALID);
      }

      return;
    }

    if (onInput) {
      onInput(nextVal);
    }
  };

  return div(
    inputBaseWrapperStyle,
    [inputElement, after, validityElement].filter(Boolean) as EofolElementNode
  );
};

export default { inputBase };
