export const capitalize = (str: string) =>
  str.length > 0
    ? str
        .split("")
        .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
        .join("")
    : str;

export const toKebab = (str: string) =>
  str.length > 0 ? str.toLowerCase().replace(" ", "-") : str;

export const toInputName =
  (componentName: string) => (propName: string, propVal?: string) =>
    [
      toKebab(componentName),
      toKebab(propName),
      propVal ? toKebab(propVal) : undefined,
    ]
      .filter(Boolean)
      .join("-");

export const toCamel = (str: string) =>
  str.length > 0
    ? str
        .toLowerCase()
        .split(" ")
        .map((item, i) => (i > 0 ? capitalize(item) : item))
        .join("")
    : str;
