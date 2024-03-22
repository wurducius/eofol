import { ElementNode } from "@eofol/eofol-types";

export const SIZE_SM = "sm";
export const SIZE_MD = "md";
export const SIZE_LG = "lg";

export type SIZE = typeof SIZE_SM | typeof SIZE_MD | typeof SIZE_LG;

export const getSize = (tagName: string) => (size: SIZE | undefined) => {
  return `${tagName}-${size ?? SIZE_MD}`;
};

export interface EComponent  {
  styles?: string | boolean | undefined;
  children?: ElementNode
}

export interface EComponentWithoutChildren  {
  styles?: string | boolean | undefined;
}