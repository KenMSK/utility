/**
 * Copy the JSON structure from default(EN) to others
 * can be run by pure node
 */
let fs = require("fs/promises")
const path = require("node:path")

function deepMerge(sourceObj, targetObj) {
  const newObj = {}
  Object.entries(sourceObj).forEach(([key, value]) => {
    const isSourceobject = typeof sourceObj?.[key] === "object"
    const isTargetObject = typeof targetObj?.[key] === "object"
    if (isSourceobject) {
      newObj[key] = deepMerge(
        sourceObj[key],
        isTargetObject ? targetObj[key] : {}
      )
      return
    }
    newObj[key] =
      targetObj?.[key] == null
        ? (newObj[key] = "TBT: " + value)
        : targetObj[key]
  })
  return newObj
}

const FoldersPath = "public/locales"
const DefaultLanguage = "en"
async function main() {
  const languages = await fs.readdir(FoldersPath)
  console.log("default language: ", DefaultLanguage)
  console.log("folder path: ", FoldersPath)
  console.log("languages: ", languages)

  if (!languages.includes(DefaultLanguage)) {
    throw new Error(
      `DB5B44FDCCA2434889CBD39235EB44D6 Default Language: ${DefaultLanguage} not found in folder structure`
    )
  }
  const jsonFiles = await fs.readdir(path.join(FoldersPath, DefaultLanguage))

  const arrayOfFiles = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = path.join(FoldersPath, DefaultLanguage, file)
      const content = JSON.parse(await fs.readFile(filePath))
      return { [file]: content }
    })
  )
  const parsedDefaultFiles = arrayOfFiles.reduce((acc, pair) => {
    return { ...acc, ...pair }
  }, {})

  // not a map, just to allow await
  const tranformations = languages.map(async (lang) => {
    if (lang === DefaultLanguage) return
    const parsedFiles = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(FoldersPath, lang, file)
        const langObject = JSON.parse(await fs.readFile(filePath))
        const newLangObj = deepMerge(parsedDefaultFiles[file], langObject)
        fs.writeFile(filePath, JSON.stringify(newLangObj, null, 2))
      })
    )
    return parsedFiles
  })

  await Promise.all(tranformations)
}

main()
