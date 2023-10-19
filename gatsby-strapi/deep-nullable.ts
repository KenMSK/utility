/**
 * Convert objects Deeply
 */

export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
