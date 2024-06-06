import { StringHandler } from "./common-types";
import { EComponent, EComponentWithoutChildren } from "./element-types";
import {
  InputHandlers,
  KeyboardHandlers,
  InputMode,
  InputTypeAttribute,
  Clickable,
} from "./input-types";
import {
  Disablable,
  Fullable,
  ImageAlt,
  Namable,
  Openable,
  Schemable,
  Sizable,
  Tagnamable,
  Titlable,
} from "./shared-props";

// -------------- TYPOGRAPHY --------------

export type TypographyNodeContent = (string | Element)[] | (string | Element);

// ========================================
// ================== UI ==================
// ========================================

// -------------- BUTTON --------------

export type ButtonVariant = "outline" | "solid" | "ghost" | undefined;

export type ButtonBaseProps = {
  variant?: ButtonVariant;
  active?: boolean;
} & Clickable &
  Disablable &
  Fullable &
  Schemable &
  Sizable &
  EComponent;

export type IconButtonProps = ButtonBaseProps & {
  icon: string;
  iconPosition?: "left" | "right";
  iconMargin?: string;
} & Titlable &
  ImageAlt;

// -------------- CHECKBOX --------------

export type CheckboxProps = EInput<boolean> & Sizable & EComponent;

// -------------- LIST --------------

export type ListBaseProps<T> = {
  spacing?: number;
  data: T[];
  render: (item: T, index?: number) => Element | Element[];
  position?: ListPosition;
  paddingInline?: string;
};

export type UnorderedListType =
  | "circle"
  | "square"
  | "none"
  | "disc"
  | undefined;

export type OrderedListType =
  | "lowerRoman"
  | "upperRoman"
  | "lowerAlpha"
  | "upperAlpha"
  | "lowerGreek"
  | "upperGreek"
  | "lowerLatin"
  | "upperLatin"
  | "none"
  | "decimal"
  | undefined;

export type ListPosition = "outside" | "inside" | undefined;

export type UnorderedListProps<T> = ListBaseProps<T> & {
  type?: UnorderedListType;
};

export type orderedListProps<T> = ListBaseProps<T> & {
  type?: OrderedListType;
};

// -------------- SELECT --------------

export type Option = { title: string; id: string };

export type SelectOptions = ({ group: string; options: Option[] } | Option)[];

export type SelectSearchProps = {
  options: SelectOptions;
  value: string;
  defaultOptions: SelectOptions;
  onChange?: StringHandler;
} & Namable;

export type DefineSelectSearchProps = {
  options: SelectOptions;
  storeName: string;
} & Namable &
  Tagnamable;

// -------------- INPUT --------------

export type InputCommonProps<T> = {
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;

  spellcheck?: boolean;
  autocomplete?: boolean;

  validation?: ((nextVal: T) => true | string)[];
  invalid?: string | boolean;

  value: T | undefined;
} & InputHandlers<T> &
  KeyboardHandlers &
  Namable &
  Disablable &
  Sizable &
  Schemable &
  EComponentWithoutChildren;

export type InputBaseNumericProps = {
  min?: number;
  max?: number;
  step?: number;
  hideArrows?: boolean | "default";
  arrowUpIcon?: string;
  arrowDownIcon?: string;
  arrowClassname?: string;
  inputMode?: InputMode;
  precision?: number;
  allowOutOfRange?: boolean;
  format?: (nextVal: number) => string;
  parse?: (nextStrVal: string) => number;
};

export type InputTypeProps = {
  type?: InputTypeAttribute;
};

export type InputBaseSpecificProps = {
  after?: Element | false;
};

export type InputBaseProps = InputCommonProps<string> &
  InputTypeProps &
  InputBaseNumericProps &
  InputBaseSpecificProps;

export type InputProps = InputCommonProps<string> & InputTypeProps;

export type NumberInputProps = InputCommonProps<number> & InputBaseNumericProps;

export type EInput<T> = {
  value?: T;
} & Namable &
  Disablable &
  InputHandlers<T>;

// ========================================
// ================ CUSTOM ================
// ========================================

// -------------- COLLAPSE --------------

export type RenderCollapseProps = {
  render: undefined | (() => Element | string);
  iconOpen?: string;
  iconClosed?: string;
} & Titlable &
  Clickable;

export type DefineCollapseProps = RenderCollapseProps & Tagnamable & Openable;
