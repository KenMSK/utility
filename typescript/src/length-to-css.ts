/* eslint-disable no-nested-ternary */
/**
 * Converts ts Length to css units
 * @param length number or string, that represents a number
 * @returns <length>px
 */
export const lengthToCss = (length: React.CSSProperties["width"]) =>
  typeof length === "number" ? length + "px" : length
