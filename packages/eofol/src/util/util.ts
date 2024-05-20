import type { MultiOptional } from "@eofol/eofol-types";

export function arrayCombinator<T>(
  handler: (value: T) => void,
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
