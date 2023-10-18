export function DeepWrap<T>(
  childPaths: T,
  prefix: string = "",
  suffix: string = ""
): T {
  if (typeof childPaths === "string") {
    return (prefix + childPaths + suffix) as T
  }
  return Object.keys(childPaths as Object).reduce((acc, i) => {
    return {
      ...acc,
      [i]: DeepWrap(childPaths[i as keyof typeof childPaths], prefix, suffix),
    }
  }, {}) as T
}

const partners = {
  AIA: "AIA logo",
  CIC: "CIC logo",
  ey: "EY_logo_2019",
  manulife: "Manulife-logo",
  ubs: "UBS-logo",
  lian: "利安logo",
  anz: "ANZ-Logo",
  citi: "CIti logo",
  jtc: "JTC_logo",
  pwc: "Pwc logo",
  ubaby: "Ubaby logo",
  daisan: "大新銀行",
  alliance: "Alliance Capital Partners logo",
  combokid: "Combokid logo",
  kcbh_logo: "KCBH_logo",
  sesg: "SESG",
  vp_bank_logo: "VP_Bank_Logo",
  kaisi: "凱施餅店logo",
  bankofsingapore: "Bank of Singapore logo",
  deloitte: "Deloitte-Logo",
  kpmg: "KPMG-logo",
  tmf_group: "TMF_Group",
  bea: "bea-logo",
  meiso: "美素佳兒logo",
}
const partnersPaths = DeepWrap(partners, "partners/", ".png")

const business = {
  // order by file name
  analyze: "analyze",
  baby: "baby-face",
  bank: "bank",
  bill: "Bill",
  businessman: "businessman-svg",
  checklist: "checklist",
  currency: "currency-exchange",
  goal: "goal",
  account: "merchant-account",
  medical: "medical-bag",
  mommy: "mommy-and-me-classes",
  moneyPig: "money-box",
  money: "money-cycle",
  oldman: "old-man",
  organization: "organization",
  protect: "protect",
  mask: "protection-mask",
  staff: "staff-svg",
  survey: "survey",
  tax: "tax-svg",
  techsupport: "technical-support",
  timetable: "Timetable",
  tree: "tree-structure",
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
  photo2: "Team2",
  photo3: "Team3",
  photo4: "Team4",
  photo5: "Team5",
  photo6: "Team6",
  photo7: "Team7",
  photo8: "Team8",
  photo9: "Team9",
  photo10: "Team10",
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
