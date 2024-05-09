import { EofolClassnameSingle } from "@eofol/eofol-types";

export const ax = (
  initialAttributes: Record<string, string>,
  ...attributes: [string, string | undefined | boolean | number][]
) =>
  attributes.reduce((acc, next) => {
    if (next && next[1] !== undefined && next[1] !== false) {
      acc[next[0]] = next[1].toString();
    }
    return acc;
  }, initialAttributes);

export const cx = (...styles: EofolClassnameSingle[]) =>
  styles.filter(Boolean).join(" ");

export const addCx = (
  element: Element | null,
  ...styles: EofolClassnameSingle[]
) => {
  if (element) {
    element.className += styles.reduce(
      (acc, next) => (next ? `${acc} ${next}` : acc),
      ""
    );
  }
};

export const removeCx = (
  element: Element | null,
  ...styles: EofolClassnameSingle[]
) => {
  if (element) {
    element.className = element.className
      .split(" ")
      .filter((clazz) => !styles.includes(clazz))
      .join(" ");
  }
};

export default { ax, cx, addCx, removeCx };
