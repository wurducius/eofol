import { MultiOptional, Multi } from "./common-types";

export type EofolElementNode = MultiOptional<Element | string>;

export type EofolClassname = Multi<EofolClassnameSingle>;

// export type EofolClassnameSingle = Optional<string | false | null>;
export type EofolClassnameSingle =
  | (string | false | undefined)[]
  | (string | false | undefined);

export type EofolAttributes = any;

export type EofolProperties = any;

export type EofolElementCreator = (
  classname?: EofolClassname,
  children?: EofolElementNode,
  attributes?: EofolAttributes,
  properties?: EofolProperties
) => HTMLElement;

export type EofolSimplifiedElementCreator = (
  content?: EofolElementNode,
  classname?: EofolClassname,
  attributes?: EofolAttributes,
  properties?: EofolProperties
) => HTMLElement;
