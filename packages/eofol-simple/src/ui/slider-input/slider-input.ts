import { getTheme, sx, cx } from "@eofol/eofol";
import { inputBase } from "../input-base/input-base";
import { getInputSizeStyle } from "../../util/inputs";
import { SIZE, Schemable } from "@eofol/eofol-types";
import { getColorScheme } from "../../util/scheme";

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
  size,
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
  classname?: string;
  size?: SIZE;
} & Schemable) => {
  const theme = getTheme();

  const accentColorScheme = getColorScheme(scheme, "secondary");
  const baseColorScheme = getColorScheme(scheme);

  const baseStyle = sx({
    color: baseColorScheme.base,
  });
  const sizeStyle = getInputSizeStyle(size);

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
      sizeStyle,
      sx({
        marginTop: theme.spacing.space1,
        padding: "0 0 0 0",
        width: "256px",
        accentColor: accentColorScheme.base,
        cursor: "pointer",
      }),
      sx({ accentColor: accentColorScheme.dark }, ":hover"),
      classname
    ),
  });
};

export default { sliderInput };
