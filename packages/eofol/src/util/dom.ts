export const appendChild =
  (parent: ParentNode) => (child: Element | string) => {
    parent.append(child);
  };

export const removeChildren = (element: ParentNode, renderOffset?: number) => {
  const nodesToRemove = [];
  for (let c = 0 + (renderOffset ?? 0); c < element.childNodes.length; c++) {
    nodesToRemove.push(element.childNodes.item(c));
  }
  nodesToRemove.forEach((child) => {
    element.removeChild(child);
  });
};
