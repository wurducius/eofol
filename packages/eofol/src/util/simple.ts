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

export const cx = (...styles: (string | boolean | undefined)[]) =>
  styles.filter(Boolean).join(" ");

export default { ax, cx };
