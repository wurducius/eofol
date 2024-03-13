import { StateTypeImpl, RenderType } from "@eofol/eofol-types";
import { arrayCombinator } from "../util/util";
import { appendChild, removeChildren } from "../util/dom";
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
    render,
    state: initialState ?? {},
    setState: (next: StateTypeImpl<StateType>) => {
      targetElementRegistry[targetId] = {
        ...targetElementRegistry[targetId],
        state: next,
      };

      removeChildren(target);

      const rendered = render(
        targetElementRegistry[targetId].state,
        targetElementRegistry[targetId].setState
      );
      arrayCombinator(appendChild(target), rendered);
    },
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
