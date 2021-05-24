import { L } from "ts-toolbelt";

/**
 * Inserts an element at the start of a tuple
 *
 * @param E Element (type)
 * @param T Tuple
 * @return Tuple
 */
export type Prepend<E, T extends L.List> = ((
  element: E,
  ...tail: T
) => void) extends (...tuple: infer R) => void
  ? R
  : never;
