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

export function mergeDeep(target: any, source: any) {
  const result = { ...target, ...source };
  for (const key of Object.keys(result)) {
    result[key] =
      typeof target[key] == "object" && typeof source[key] == "object"
        ? mergeDeep(target[key], source[key])
        : structuredClone(result[key]);
  }
  return result;
}

export default { mergeDeep };
