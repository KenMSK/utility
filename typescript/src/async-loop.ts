export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => any
) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array)
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
  const maxItem = targetArray.length
  let progressCount = -1
  const threadToStart = Math.min(maxItem, maxThread)
  let allSettlements = [] as PromiseSettledResult<Awaited<ResultType>>[][]

  const callbackIterate = async () => {
    progressCount++
    if (progressCount < maxItem) {
      const callbackAndNext = async () => {
        try {
          const r = await callback(
            targetArray[progressCount],
            progressCount,
            targetArray
          )
          return r
        } finally {
          callbackIterate()
        }
      }

      allSettlements.push(await Promise.allSettled([callbackAndNext()]))
    }
  }

  for (let i = 0; i < threadToStart; i++) {
    callbackIterate()
  }

  const allPromises = allSettlements.map((result) => result[0])
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
