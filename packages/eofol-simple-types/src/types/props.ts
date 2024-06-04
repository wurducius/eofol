import { Schemable } from "@eofol/eofol-types";

export type AProps = {
  link: string;
  external?: boolean;
  download?: string;
} & Schemable;
