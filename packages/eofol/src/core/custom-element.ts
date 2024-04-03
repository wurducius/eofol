import { EffectType, RenderType, StateTypeImpl } from "@eofol/eofol-types";
import { customElementRegistry } from "./registry";
import { customStatefulClass } from "./custom-stateful-class";

function defineAutonomousElement<StateType>({
  tagName,
  ...props
}: {
  tagName: string;
  render: RenderType<StateType>;
  initialState?: StateTypeImpl<StateType>;
  effect?: EffectType<StateType>;
  subscribe?: string[];
}) {
  customElements.define(tagName, customStatefulClass(props));
}

function defineBuiltinElement<StateType>({
  tagName,
  ...props
}: {
  tagName: string;
  render: RenderType<StateType>;
  initialState?: StateTypeImpl<StateType>;
  effect?: EffectType<StateType>;
  subscribe?: string[];
}) {
  customElements.define(tagName, customStatefulClass(props, true), {
    extends: "div",
  });
}

export function updateCustom<StateType>(
  targetId: string,
  nextState?: StateTypeImpl<StateType>
) {
  const target = customElementRegistry[targetId];
  if (target) {
    if (nextState) {
      target.setState(nextState);
    } else {
      // @TODO call render instead
      target.setState(target.state);
    }
  }
}

export default { defineAutonomousElement, defineBuiltinElement, updateCustom };
