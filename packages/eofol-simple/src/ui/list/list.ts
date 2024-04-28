import { createElement, sx } from "@eofol/eofol";

const PADDING_INLINE_START_DEFAULT = "40px";

type ListBaseProps<T> = {
  spacing?: number;
  data: T[];
  render: (item: T, index?: number) => Element | Element[];
  position?: ListPosition;
  paddingInline?: string;
};

type UnorderedListType = "circle" | "square" | "none" | "disc" | undefined;

type OrderedListType =
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

type ListPosition = "outside" | "inside" | undefined;

type UnorderedListProps<T> = ListBaseProps<T> & {
  type?: UnorderedListType;
};

type orderedListProps<T> = ListBaseProps<T> & {
  type?: OrderedListType;
};

const getUnorderedListType = (type: UnorderedListType) => {
  if (type === "none") {
    return "none";
  }
  if (type === "disc") {
    return "disc";
  }
  if (type === "square") {
    return "square";
  }
  return "circle";
};

const getOrderedListType = (type: OrderedListType) => {
  if (type === "lowerRoman") {
    return "lower-roman";
  }
  if (type === "upperRoman") {
    return "upper-roman";
  }
  if (type === "lowerAlpha") {
    return "lower-alpha";
  }
  if (type === "upperAlpha") {
    return "upper-alpha";
  }
  if (type === "lowerGreek") {
    return "lower-greek";
  }
  if (type === "upperGreek") {
    return "upper-greek";
  }
  if (type === "upperLatin") {
    return "upper-latin";
  }
  if (type === "lowerLatin") {
    return "lower-latin";
  }
  if (type === "none") {
    return "none";
  }
  return "decimal";
};

function listItem(child: Element | Element[], spacing?: number) {
  return createElement("li", sx({ marginTop: `${spacing ?? 4}px` }), child);
}

function unorderedList<T>({
  spacing,
  data,
  render,
  type,
  position,
  paddingInline,
}: UnorderedListProps<T>) {
  return createElement(
    "ul",
    sx({
      listStyleType: getUnorderedListType(type),
      listStylePosition: position ?? "outside",
      paddingInlineStart: paddingInline ?? PADDING_INLINE_START_DEFAULT,
    }),
    data.map((item, i) => listItem(render(item, i), spacing))
  );
}

function orderedList<T>({
  spacing,
  data,
  render,
  type,
  position,
  paddingInline,
}: orderedListProps<T>) {
  return createElement(
    "ol",
    sx({
      listStyleType: getOrderedListType(type),
      listStylePosition: position ?? "outside",
      paddingInlineStart: paddingInline ?? PADDING_INLINE_START_DEFAULT,
    }),
    data.map((item) => listItem(render(item), spacing))
  );
}

export default { orderedList, unorderedList };
