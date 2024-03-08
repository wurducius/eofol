import { arrayCombinator, appendChild } from "./util";
import { ElementNode } from "./eofol-types";
import { targetElementRegistry } from "./registry";

const renderTarget = (
  targetId: string,
  {
    render,
    initialState,
  }: {
    render: (state?: any, setState?: (state: any) => void) => ElementNode;
    initialState?: any;
  }
) => {
  const target = document.getElementById(targetId);

  if (target) {
    targetElementRegistry[targetId] = {
      element: target,
      state: initialState ?? {},
      setState: (next: any) => {
        targetElementRegistry[targetId] = {
          ...targetElementRegistry[targetId],
          state: next,
        };
        const nodesToRemove = [];
        for (let i = 0; i < target.children.length; i++) {
          nodesToRemove.push(target.children.item(i));
        }
        nodesToRemove.forEach((child) => {
          if (child) {
            target.removeChild(child);
          }
        });
        const rendered = render(
          targetElementRegistry[targetId].state,
          targetElementRegistry[targetId].setState
        );
        arrayCombinator(appendChild(target), rendered);
      },
      render,
    };
    const rendered = render(
      targetElementRegistry[targetId].state,
      targetElementRegistry[targetId].setState
    );
    arrayCombinator(appendChild(target), rendered);
  }
};

module.exports = renderTarget;
