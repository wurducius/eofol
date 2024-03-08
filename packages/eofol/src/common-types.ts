export type Multi<T> = T | T[];

export type Optional<T> = T | undefined;

export type MultiOptional<T> = Optional<Multi<T>>;
