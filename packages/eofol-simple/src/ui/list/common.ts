export const PADDING_INLINE_START_DEFAULT = "40px";

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
