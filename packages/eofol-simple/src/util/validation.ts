export const INPUT_INVALID = "input-invalid";

export const validateIsNumber = (val: number) => {
  const parsedVal = Number(val);
  if (!Number.isFinite(parsedVal) || Number.isNaN(parsedVal)) {
    return "Please specify a valid number.";
  } else {
    return true;
  }
};

export const validateIsInteger = (val: number) => {
  const parsedVal = Number(val);
  if (!Number.isInteger(parsedVal)) {
    return "Please specify an integer.";
  } else {
    return true;
  }
};

export const validateIsOverMin = (min: number) => (val: number) => {
  const parsedVal = Number(val);
  if (parsedVal < min) {
    return "Please specify a number greater or equal to " + min + ".";
  } else {
    return true;
  }
};

export const validateIsUnderMax = (max: number) => (val: number) => {
  const parsedVal = Number(val);
  if (parsedVal > max) {
    return "Please specify a number lesser or equal to " + max + ".";
  } else {
    return true;
  }
};

export const validateIsPositive = (val: number) => {
  const parsedVal = Number(val);
  if (parsedVal <= 0) {
    return "Please specify a positive number.";
  } else {
    return true;
  }
};

export const validateIsStrictlyOverMin = (min: number) => (val: number) => {
  const parsedVal = Number(val);
  if (parsedVal <= min) {
    return "Please specify a number strictly greather than " + min + ".";
  } else {
    return true;
  }
};

export const validateIsRequired = (val: number) => {
  if (!val) {
    return "Please specify a value.";
  } else {
    return true;
  }
};

export const integerValidation = (min: number, max: number) => [
  validateIsRequired,
  validateIsNumber,
  validateIsInteger,
  validateIsOverMin(min),
  validateIsUnderMax(max),
];

export const decimalValidation = (min: number, max: number) => [
  validateIsRequired,
  validateIsNumber,
  validateIsOverMin(min),
  validateIsUnderMax(max),
];

export const decimalPositiveValidation = (max: number) => [
  validateIsRequired,
  validateIsNumber,
  validateIsPositive,
  validateIsUnderMax(max),
];

export default {
  validateIsInteger,
  validateIsNumber,
  validateIsOverMin,
  validateIsPositive,
  validateIsRequired,
  validateIsStrictlyOverMin,
  validateIsUnderMax,
  integerValidation,
  decimalValidation,
  decimalPositiveValidation,
};
