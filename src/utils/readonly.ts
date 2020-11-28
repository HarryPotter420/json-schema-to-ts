/**
 * Recursively add the `readonly` directive from an object properties or tuple items
 *
 * @param O Object / Tuple
 * @return Object / Tuple
 */
export type ReadonlyRec<O> = O extends object
  ? { readonly [K in keyof O]: ReadonlyRec<O[K]> }
  : O;
