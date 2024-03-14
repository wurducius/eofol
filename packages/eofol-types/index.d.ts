import commonTypesI from "./src/types/common-types";
import eofolTypesI from "./src/types/eofol-types";
import styleTypesI from "./src/types/style-types";

export type Multi<T> = commonTypesI.Multi;
export type Optional<T> = commonTypesI.Optional;
export type MultiOptional<T> = commonTypesI.MultiOptional;

export type CSSObject = styleTypesI.CSSObject;

export type ElementNode = eofolTypesI.ElementNode;
export type StateSetter<StateType> = eofolTypesI.StateSetter;
export type StateTypeImpl<StateType> = eofolTypesI.StateTypeImpl;
export type StatefulArg<StateType, T> = eofolTypesI.StatefulArg;
export type StatefulElement<StateType> = eofolTypesI.StatefulElement;
export type EffectType<T> = eofolTypesI.EffectType;
export type RenderType<StateType> = eofolTypesI.RenderType;
export type ControlledCustomElement<StateType> =
  eofolTypesI.ControlledCustomElement;
export type ControlledTargetElement<StateType> =
  eofolTypesI.ControlledTargetElement;
