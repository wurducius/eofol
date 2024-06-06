import { Handler, MultiOptional, Procedure } from "./common-types";
import { EofolElementNode } from "./element-types";

export type StateSetter<StateType> = Procedure<StateType>;

// @TODO typing how the hell do we type {}?
export type StateTypeImpl<StateType> = StateType | undefined | {};
// | Object

export type StatefulArg<StateType, T> = (
  state?: StateTypeImpl<StateType>,
  setState?: StateSetter<StateTypeImpl<StateType>>,
  attributes?: Object
) => T;

export interface StatefulElement<StateType> {
  state: StateTypeImpl<StateType>;
  renderUpdate: Handler;
}

export type EffectType<T> = MultiOptional<
  StatefulArg<T, void | StatefulArg<T, void>>
>;

export type RenderType<StateType> = StatefulArg<StateType, EofolElementNode>;

export type ControlledCustomElement<StateType> = {
  root: Element | ShadowRoot | null;
  state: StateTypeImpl<StateType>;
  setState: StateSetter<StateType>;
  subscribe?: string[];
};

export type ControlledTargetElement<StateType> = {
  element: Element;
  state: StateTypeImpl<StateType>;
  setState: StateSetter<StateType>;
  render: RenderType<StateType>;
  subscribe?: string[];
};
