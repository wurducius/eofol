import { Handler, KeyboardEventHandler, Procedure } from "./common-types";

export interface Clickable {
  onClick?: Handler;
}

export interface InputHandlers<T> {
  onChange: Procedure<T>;
  onBlur?: Procedure<T>;
  onInput?: Procedure<T>;
  onFocus?: Procedure<T>;
  onInvalid?: Procedure<T>;
}

export interface KeyboardHandlers {
  onKeyDown?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
  onKeyPress?: KeyboardEventHandler;
  onPaste?: KeyboardEventHandler;
}
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

export type InputMode =
  | "search"
  | "text"
  | "none"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal";
