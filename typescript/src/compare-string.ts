type CompareOptions = { isPutFalsyLast?: boolean } | undefined

type Stringy = string | null | undefined

/**
 * Basically localeCompare, but with added options
 * */
export function compareString(
  a: Stringy,
  b: Stringy,
  options?: CompareOptions
) {
  const sa = String(a ?? "")
  const sb = String(b ?? "")
  console.log("DEBUG!!! Compare <021496>", { a, b, sa, sb }, "{a,b,sa,sb}")
  if (!options?.isPutFalsyLast) {
    return sa.localeCompare(sb)
  }
  // Put falsy to the last
  if (sa && sb) {
    return sa.localeCompare(sb)
  }
  if (sa) return 1
  if (sb) return -1
  return 0
}
