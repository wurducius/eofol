import { EComponent, Schemable, Sizable } from "@eofol/eofol-types";

export type AProps = {
  link: string;
  external?: boolean;
  download?: string;
} & Schemable &
  EComponent;

export type LinkButtonProps = AProps & Schemable & Sizable;
