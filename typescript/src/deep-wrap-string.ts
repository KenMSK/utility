/**
 * Add prefix and suffix to each string in an object and its children
 * @param objectOfStrings object/array of Strings to be wrapped
 * @param prefix Adds prefix to each string
 * @param suffix adds suffix to each string
 * @returns object of Strings wrapped with prefix and suffix
 */
export function DeepWrap<T>(
  objectOfStrings: T,
  prefix: string = "",
  suffix: string = ""
): T {
  if (typeof objectOfStrings === "string") {
    return (prefix + objectOfStrings + suffix) as T
  }
  if (Array.isArray(objectOfStrings)) {
    return (objectOfStrings as unknown[]).map((item) =>
      DeepWrap(item, prefix, suffix)
    ) as T
  }
  if (typeof objectOfStrings === "object" && objectOfStrings !== null) {
    return Object.keys(objectOfStrings as Object).reduce((acc, i) => {
      return {
        ...acc,
        [i]: DeepWrap(
          objectOfStrings[i as keyof typeof objectOfStrings],
          prefix,
          suffix
        ),
      }
    }, {}) as T
  }
  // unexpected use case but should not cause error
  return objectOfStrings
}

/* examples
const partners = {
  AIA: "AIA logo",
}
const partnersPaths = DeepWrap(partners, "partners/", ".png")

const business = {
  // order by file name
  analyze: "analyze",
  partners,
}

const businessPaths = {
  ...DeepWrap(business, "", ".svg"),
  partners: partnersPaths,
}

const media = {
  email: "icn_24x24_email",
  linkedIn: "icn_24x24_linkedin",
}

const contactUs = {
  info: "info_email",
  career: "career_email",
  media: "media_email",
}

const aboutUs = {
  creativity: "creativity",
  winwin: "winwin",
  unity: "unity",
  sincere: "sincere",
}

const photo = {
  photo1: "Team1",
}

const mediaPath = DeepWrap(media, "/media/", ".png")

const contactUsPath = DeepWrap(contactUs, "/contact_us/", ".svg")

const aboutUsPath = DeepWrap(aboutUs, "/about_us/", ".svg")

const photoPath = DeepWrap(photo, "/about_us/photo/", ".jpeg")

export const resourcePaths = {
  logo: "/earnest-logo.png",
  business: DeepWrap(businessPaths, "/business/"),
  media: mediaPath,
  contactUs: contactUsPath,
  aboutUs: aboutUsPath,
  sample: "/Sample.png",
  teamPhoto: photoPath,
} as const

*/
