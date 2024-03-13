import { MultiOptional } from "./common-types";

export type ElementNode = MultiOptional<Element>;

export type StateSetter<StateType> = (newState: StateType) => void;

// @TODO typing how the hell do we type {}?
export type StateTypeImpl<StateType> = StateType | Object;

export type StatefulArg<StateType, T> = (
  state?: StateTypeImpl<StateType>,
  setState?: StateSetter<StateTypeImpl<StateType>>
) => T;

export interface StatefulElement<StateType> {
  state: StateTypeImpl<StateType>;
  renderUpdate: () => void;
}

export type EffectType<T> = MultiOptional<
  StatefulArg<T, void | StatefulArg<T, void>>
>;

export type RenderType<StateType> = StatefulArg<StateType, ElementNode>;

export type ControlledCustomElement<StateType> = {
  root: ShadowRoot | null;
  setState: StateSetter<StateType>;
};

export type ControlledTargetElement<StateType> = {
  element: Element;
  state: StateTypeImpl<StateType>;
  setState: StateSetter<StateType>;
  render: RenderType<StateType>;
};
