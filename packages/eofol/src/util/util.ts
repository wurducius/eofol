import { MultiOptional } from "../types/common-types";

export const appendChild = (parent: ParentNode) => (child: Element) => {
  parent.append(child);
};

export const removeChildren = (element: ParentNode, renderOffset?: number) => {
  const nodesToRemove = [];
  for (let c = 0 + (renderOffset ?? 0); c < element.childNodes.length; c++) {
    nodesToRemove.push(element.childNodes.item(c));
  }
  nodesToRemove.forEach((child) => {
    if (element) {
      element.removeChild(child);
    }
  });
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

export function generateId() {
  return crypto.randomUUID();
}
