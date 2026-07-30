export interface Profile {
  network: string
  username: string
  url: string
}

export interface Basics {
  name: string
  label: string
  email: string
  url: string
  summary: string
  location: {
    city: string
    countryCode: string
    region: string
  }
  profiles: Profile[]
}

export interface Work {
  name: string
  position: string
  url?: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[]
}

export interface Education {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  courses: string[]
}

export interface Skill {
  name: string
  level: string
  keywords: string[]
}

export interface Language {
  language: string
  fluency: string
}

export interface Project {
  name: string
  description: string
  highlights: string[]
  url?: string
  keywords: string[]
}

export interface Interest {
  name: string
  keywords?: string[]
}

export interface Resume {
  basics: Basics
  work: Work[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  projects: Project[]
  interests: Interest[]
}
