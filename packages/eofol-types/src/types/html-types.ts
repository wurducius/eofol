export type InputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | undefined;

export type InputCommonProps<T> = {
  onChange: (nextValue: T) => void;
  onBlur?: (nextValue: T) => void;
  onInput?: (nextValue: T) => void;
  onFocus?: (nextValue: T) => void;
  onInvalid?: (nextValue: T) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onPaste?: (event: ClipboardEvent) => void;
  classname?: string;
  name?: string;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  spellcheck?: boolean;
  autocomplete?: boolean;

  validation?: ((nextVal: T) => true | string)[];
  value: T;
};

export type InputBaseNumericProps = {
  min?: number;
  max?: number;
  step?: number;
  hideArrows?: boolean;
  arrowStyle?: any;
};

export type InputTypeProps = {
  type?: InputTypeAttribute;
};

export type InputBaseProps = InputCommonProps<string> &
  InputTypeProps &
  InputBaseNumericProps;

export type InputProps = InputCommonProps<string> & InputTypeProps;

export type NumberInputProps = InputCommonProps<number> & InputBaseNumericProps;
