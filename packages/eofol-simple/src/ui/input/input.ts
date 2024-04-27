import { ax, createElement } from "@eofol/eofol";

const input = ({
  value,
  onChange,
  onBlur,
  onInput,
  onFocus,
  classname,
  name,
  type,
  max,
  min,
  step,
  spellcheck,
}: {
  value: string;
  onChange: (nextValue: string) => void;
  onBlur?: (nextValue: string) => void;
  onInput?: (nextValue: string) => void;
  onFocus?: (nextValue: string) => void;
  classname?: string;
  name?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  spellcheck?: boolean;
}) => {
  return createElement(
    "input",
    classname,
    undefined,
    ax(
      { value },
      ["name", name],
      ["id", name],
      ["type", type],
      ["min", min],
      ["max", max],
      ["step", step],
      ["aria-label", name],
      ["spellcheck", spellcheck]
    ),
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
      // @ts-ignore
      oninput: (e) => {
        if (onInput) {
          onInput(e.target.value);
        }
      },
      // @ts-ignore
      onfocus: (e) => {
        if (onFocus) {
          onFocus(e.target.value);
        }
      },
    }
  );
};

export default input;
