export type Multi<T> = T | T[];

export type Optional<T> = T | undefined;

export type MultiOptional<T> = Optional<Multi<T>>;

export type Handler = () => void;

export type Procedure<T> = (arg: T) => void;

export type NumberHandler = Procedure<number>;

export type StringHandler = Procedure<string>;

export type KeyboardEventHandler = Procedure<KeyboardEvent>;
