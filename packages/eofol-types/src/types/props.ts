export type Option = { title: string; id: string };

export type SelectOptions = ({ group: string; options: Option[] } | Option)[];

export type SelectSearchProps = {
  options: SelectOptions;
  value: string;
  defaultOptions: SelectOptions;
  onChange: undefined | ((nextVal: string) => void);
  name: string;
};

export type DefineSelectSearchProps = {
  options: SelectOptions;
  storeName: string;
  tagName: string;
  name: string;
};

export type TypographyNodeContent = (string | Element)[] | (string | Element);

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
