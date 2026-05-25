export type ResumeStatus = "draft" | "optimized" | "ready" | "archived"

export type ResumeItem = {
  id: string
  title: string
  atsScore: number
  updatedAt: string
  status: ResumeStatus
  template: string
  fileType: "PDF" | "DOCX"
  size: string
  summary: string
  sectionCoverage: Array<{ label: string; value: number }>
  resumeUrl: string
}

export type ResumeTip = {
  icon: string
  title: string
  description: string
}

export type ResumeTemplate = {
  id: string
  name: string
  selected: boolean
  previewGradient: string
}

export type ResumeTheme = {
  id: string
  name: string
  description: string
  accent: string
  selected: boolean
}

export type ResumeFont = {
  id: string
  name: string
  family: string
  selected: boolean
}

export type ResumeSection = {
  id: string
  title: string
  description: string
  completed: boolean
}

export type ResumeBuilderData = {
  themes: ResumeTheme[]
  fonts: ResumeFont[]
  sections: ResumeSection[]
}

export type ResumeDashboardData = {
  resumes: ResumeItem[]
  tips: ResumeTip[]
  templates: ResumeTemplate[]
  metrics: Array<{ label: string; value: string; note: string }>
  lastUpload: string
}