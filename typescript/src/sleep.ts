/**
 * async sleep for milliseconds
 * */
export async function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  )
}
