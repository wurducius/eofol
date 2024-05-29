export const capitalize = (str: string) =>
  str.length > 0
    ? str
        .split("")
        .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
        .join("")
    : str;

export const toKebab = (str: string) =>
  str.length > 0 ? str.toLowerCase().replace(" ", "-") : str;
