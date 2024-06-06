export const SIZE_SM = "sm";
export const SIZE_MD = "md";
export const SIZE_LG = "lg";
export const SIZE_XL = "xl";
export const SIZE_2XL = "2xl";

export type SIZE =
  | typeof SIZE_SM
  | typeof SIZE_MD
  | typeof SIZE_LG
  | typeof SIZE_XL
  | typeof SIZE_2XL
  | undefined;

export interface Sizable {
  size?: SIZE;
}

export type ColorScheme = "primary" | "secondary" | "tertiary" | undefined;

export interface Schemable {
  scheme?: ColorScheme;
}

export interface Namable {
  name: string;
}

export interface Titlable {
  title?: string;
}

export interface Disablable {
  disabled?: boolean;
}

export interface Fullable {
  full?: boolean;
}

export interface ImageAlt {
  alt: string;
}

export interface Openable {
  open?: boolean;
}

export interface Tagnamable {
  tagName: string;
}
