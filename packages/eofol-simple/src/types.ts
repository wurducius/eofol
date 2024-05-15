import {
  EofolClassnameSingle,
  EofolElementNode,
  Multi,
} from "@eofol/eofol-types";

export const SIZE_SM = "sm";
export const SIZE_MD = "md";
export const SIZE_LG = "lg";
export const SIZE_XL = "xl";

export type SIZE =
  | typeof SIZE_SM
  | typeof SIZE_MD
  | typeof SIZE_LG
  | typeof SIZE_XL
  | undefined;

export const getSize = (tagName: string) => (size: SIZE | undefined) => {
  return `${tagName}-${size ?? SIZE_MD}`;
};

export interface EComponent {
  styles?: Multi<EofolClassnameSingle>;
  children?: EofolElementNode;
}

export interface EComponentWithoutChildren {
  styles?: Multi<EofolClassnameSingle>;
}

export interface EInput<T> {
  onChange?: (nextValue: T) => void;
  onBlur?: (nextValue: T) => void;
  value?: T;
  disabled?: boolean;
  name: string;
}

export interface ESizable {
  size?: SIZE;
}

export interface EButton {
  onClick?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
}
