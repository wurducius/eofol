import { createElement, sx } from "@eofol/eofol";
import { PADDING_INLINE_START_DEFAULT } from "./common";
import { listItem } from "./list-item";
import { UnorderedListType, UnorderedListProps } from "@eofol/eofol-types";

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

export default unorderedList;
