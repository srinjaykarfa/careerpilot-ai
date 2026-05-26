export type ResumeStatus = "DRAFT" | "READY" | "ARCHIVED"

export type ResumeLink = {
  id: string
  label: string
  url: string
}

export type ResumeEducation = {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  location: string
  description: string
}

export type ResumeExperience = {
  id: string
  company: string
  role: string
  location: string
  startYear: string
  endYear: string
  description: string
}

export type ResumeProject = {
  id: string
  name: string
  role: string
  link: string
  description: string
}

export type ResumeCertification = {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl: string
}

export type ResumeReferenceFile = {
  fileName: string
  fileType: string
  fileSize: number
  dataUrl: string
}

export type ResumeBuilderContent = {
  title: string
  personal: {
    fullName: string
    email: string
    country: string
    phone: string
    location: string
  }
  links: ResumeLink[]
  summary: string
  skills: string[]
  education: ResumeEducation[]
  experience: ResumeExperience[]
  projects: ResumeProject[]
  certifications: ResumeCertification[]
  references: ResumeReferenceFile | null
  settings: {
    themeId: string
    fontId: string
  }
}

export type SaveResumePayload = {
  userId: string
  resumeId?: string
  status?: ResumeStatus
  title?: string
  content: ResumeBuilderContent
}

export type ResumeSaveResponse = {
  id: string
  status: ResumeStatus
  updatedAt: string
}
