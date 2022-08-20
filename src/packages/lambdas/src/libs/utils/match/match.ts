import { Predicate, Action } from './types';

/**
 * Contextual switch that checks if a value is matched against a predicate
 * and returns a desired action
 *
 * @param {T} x The value to match
 * @returns {any} The desired operation to execute
 */
const match = <T>(x?: T): any => ({
  on: (pred: Predicate<T>, fn: Action<T>) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: (fn: Action<T>) => fn(x),
});

const matched = <T>(fn: Action<T>) => ({
  on: () => matched(fn),
  otherwise: () => fn,
});

export default match;
