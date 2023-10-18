/**
 * Return true if test subject equals any of the values
 * @param testSubject
 * @param values
 * @returns
 */
export function isOneOf<TestSubject, AcceptableValues extends TestSubject>(
  testSubject: TestSubject,
  values: AcceptableValues[]
) {
  // the reason of this function is to force the array to follow the type of the test value
  // eg. the testSubject = 'A' | 'B' will force the array values to be 'A' or 'B'
  if (values.includes(testSubject as any)) return true
  return false
}
