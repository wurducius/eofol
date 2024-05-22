import { createElement, sx } from "@eofol/eofol";
import { PADDING_INLINE_START_DEFAULT } from "./common";
import { listItem } from "./list-item";
import { OrderedListType, orderedListProps } from "@eofol/eofol-types";

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

export default orderedList;
