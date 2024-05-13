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
