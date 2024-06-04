import { createElement, sx } from "@eofol/eofol";

export function listItem(child: Element | Element[], spacing?: number) {
  return createElement("li", sx({ marginTop: `${spacing ?? 4}px` }), child);
}
