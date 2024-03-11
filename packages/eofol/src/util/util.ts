import { MultiOptional } from "../types/common-types";

export const appendChild = (parent: ParentNode) => (child: Element) => {
  parent.append(child);
};

export function arrayCombinator<T>(
  handler: (value: T) => void,
  data: MultiOptional<T>
) {
  if (data) {
    if (Array.isArray(data)) {
      data.forEach(handler);
    } else {
      handler(data);
    }
  }
}
