import { createElement } from "../../../core/render-element";
import { ax } from "../../../util/simple";

const input = ({
  value,
  onChange,
  onBlur,
  onInput,
  classname,
  name,
  type,
}: {
  value: string;
  onChange: (nextValue: string) => void;
  onBlur?: (nextValue: string) => void;
  onInput?: (nextValue: string) => void;
  classname?: string;
  name?: string;
  type?: string;
}) => {
  return createElement(
    "input",
    classname,
    undefined,
    ax({ value }, ["name", name], ["id", name], ["type", type]),
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
    }
  );
};

export default input;
