import { arrayCombinator, appendChild } from "../util/util";
import { RenderType, StateTypeImpl } from "../types/eofol-types";
import { targetElementRegistry } from "./registry";

function registerTargetElement<StateType>(
  targetId: string,
  target: Element,
  {
    initialState,
    render,
  }: {
    initialState?: StateTypeImpl<StateType>;
    render: RenderType<StateType>;
  }
) {
  if (targetElementRegistry[targetId]) {
    console.log(
      `Target element #${target} already registered. This is probably caused by a programming error.`
    );
  }

  targetElementRegistry[targetId] = {
    element: target,
    state: initialState ?? {},
    setState: (next: StateTypeImpl<StateType>) => {
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
}

function renderTarget<StateType>(
  targetId: string,
  props: {
    render: RenderType<StateType>;
    initialState?: StateTypeImpl<StateType>;
  }
) {
  const { render } = props;

  const target = document.getElementById(targetId);

  if (target) {
    registerTargetElement(targetId, target, props);

    const rendered = render(
      targetElementRegistry[targetId].state,
      targetElementRegistry[targetId].setState
    );
    arrayCombinator(appendChild(target), rendered);
  }
}

function updateStateTarget<StateType>(
  targetId: string,
  nextState: StateTypeImpl<StateType>
) {
  const target = targetElementRegistry[targetId];
  if (target) {
    target.setState(nextState);
  }
}

module.exports = { renderTarget, updateStateTarget };
