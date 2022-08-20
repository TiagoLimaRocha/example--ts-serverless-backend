export type Predicate<T> = (arg?: T | void) => boolean;

export type Action<T> = (arg?: T) => Action<unknown>;