import { InputProps } from "@eofol/eofol-types";
import { inputBase } from "../input-base/input-base";
import { getTheme, cx, sx } from "@eofol/eofol";
import { INPUT_INVALID } from "../../util/validation";

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
  });

  const focusStyle = sx(
    { outline: `2px solid ${theme.color.secondary}` },
    `:focus:not(.${INPUT_INVALID})`
  );

  return inputBase({
    ...props,
    type: "text",
    classname: cx(baseStyle, focusStyle, props.classname),
  });
};

export default { input };
