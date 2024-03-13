const commonTypesI = require("./src/types/common-types");
const eofolTypesI = require("./src/types/eofol-types");
const styleTypesI = require("./src/types/style-types");

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
