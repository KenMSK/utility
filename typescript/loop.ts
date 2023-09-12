export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => any
) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array)
  }
}

export async function allSettleForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => any
) {
  return Promise.allSettled(array.map(callback))
}
