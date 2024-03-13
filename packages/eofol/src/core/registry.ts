import {
  ControlledCustomElement,
  ControlledTargetElement,
} from "../types/eofol-types";

// @TODO typing any
export const customElementRegistry: Record<
  string,
  ControlledCustomElement<any>
> = {};

// @TODO typing any
export const targetElementRegistry: Record<
  string,
  ControlledTargetElement<any>
> = {};
