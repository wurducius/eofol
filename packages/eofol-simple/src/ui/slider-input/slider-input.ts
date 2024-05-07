import { getTheme, sx, cx } from "@eofol/eofol";
import { inputBase } from "../input-base/input-base";

const sliderInput = ({
  value,
  name,
  onChange,
  onInput,
  onBlur,
  onFocus,
  classname,
  min,
  max,
  step,
  disabled,
  readonly,
  scheme,
}: {
  value: string;
  name: string;
  onChange: (nextVal: number) => void;
  onInput?: (nextVal: number) => void;
  onBlur?: (nextVal: number) => void;
  onFocus?: (nextVal: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  scheme?: "primary" | "secondary";
  classname?: string;
}) => {
  const theme = getTheme();

  const baseStyle = sx({
    color: scheme === "primary" ? theme.color.primary : theme.color.secondary,
  });

  const parentStyle = sx({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.space2,
    justifyContent: "center",
  });

  return inputBase({
    name,
    value,
    onChange: (nextVal: string) => onChange(Number(nextVal)),
    onInput: onInput
      ? (nextVal: string) => onInput(Number(nextVal))
      : undefined,
    onBlur: onBlur ? (nextVal: string) => onBlur(Number(nextVal)) : undefined,
    onFocus: onFocus
      ? (nextVal: string) => onFocus(Number(nextVal))
      : undefined,
    type: "range",
    min: min ?? 0,
    max: max ?? 100,
    step: step ?? 1,
    disabled,
    readonly,
    classname: cx(
      baseStyle,
      classname,
      sx({
        marginTop: theme.spacing.space1,
        padding: "0 0 0 0",
        width: "256px",
        height: "24px",
        accentColor: theme.color.secondary,
        cursor: "pointer",
      }),
      sx({ accentColor: theme.color.secondaryDarker }, ":hover")
    ),
  });
};

export default { sliderInput };
