import type { MultiOptional, Procedure } from "@eofol/eofol-types";

export function arrayCombinator<T>(
  handler: Procedure<T>,
  data: MultiOptional<T>
) {
  if (data) {
    if (Array.isArray(data)) {
      data.forEach(handler);
    } else {
      handler(data);
    }
  }
}

export function merge(x: Object, y: Object) {
  return { ...x, ...y };
}

export default {};
