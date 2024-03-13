import {
  ControlledCustomElement,
  ControlledTargetElement,
} from "@eofol/eofol-types";

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
