import { InputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, cx, sx } from "@eofol/eofol";
import { INPUT_INVALID } from "../../util/validation";
import {
  INPUT_FOCUS_OUTLINE,
  INPUT_NO_FOCUS_OUTLINE,
  INPUT_TRANSITION_STYLE,
} from "../../styles/input-styles";

export const input = (props: InputProps) => {
  const theme = getTheme();

  const baseStyle = sx({
    zIndex: 0,
    cursor: "text",
    padding: "2px 10px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: theme.typography.text.fontSize,
    height: "24px",
    backgroundColor: theme.color.backgroundElevation,
    color: theme.color.secondary,
    border: `1px solid ${theme.color.secondary}`,
    transition: INPUT_TRANSITION_STYLE,
  });

  const focusStyle = sx(
    { outline: INPUT_FOCUS_OUTLINE(theme) },
    `:focus:not(.${INPUT_INVALID})`
  );
  const notFocusStyle = sx({ outline: INPUT_NO_FOCUS_OUTLINE }, `:not(:focus)`);

  return inputBase({
    ...props,
    type: "text",
    classname: cx(baseStyle, notFocusStyle, focusStyle, props.classname),
  });
};

export default { input };
