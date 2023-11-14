export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => any
) {
  for (let index = 0; index < array.length; index++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array)
    } catch (error) {
      console.error(
        `asyncForEach: Error processing item at index ${index}: ${array[index]}`,
        error
      )
      throw error
    }
  }
}

/**
 * for loop aysnc, fire all in parallel
 * */
export async function allSettleForEach<T, ResultType>(
  array: T[],
  callback: (
    item: T,
    index: number,
    array: T[]
  ) => Promise<ResultType> | ResultType
) {
  const allPromises = await Promise.allSettled(array.map(callback))
  const fulfilledValues = (
    allPromises.filter(
      (p) => p.status === "fulfilled"
    ) as PromiseFulfilledResult<ResultType>[]
  ).map((p) => p.value)
  const rejectedReasons = (
    allPromises.filter(
      (p) => p.status === "rejected"
    ) as PromiseRejectedResult[]
  ).map((p) => p.reason)
  return { allPromises, fulfilledValues, rejectedReasons }
}

/**
 * for loop aysnc, run them in parallel but limit the thread that runs
 * */
export async function parallelForEach<T, ResultType>(
  targetArray: T[],
  callback: (
    item: T,
    index: number,
    array: T[]
  ) => Promise<ResultType> | ResultType,
  maxThread: number = 8
) {
  let index = 0
  const results: ResultType[] = []
  const runningPromises: Promise<void>[] = []

  const run: (index: number) => Promise<void> = async (i: number) => {
    if (i >= targetArray.length) return
    const item = targetArray[i]
    const result = await callback(item, i, targetArray)
    results[i] = result
    index++
    return run(index)
  }

  for (let i = 0; i < maxThread; i++) {
    runningPromises.push(run(index++))
  }

  await Promise.all(runningPromises)

  return results
}
