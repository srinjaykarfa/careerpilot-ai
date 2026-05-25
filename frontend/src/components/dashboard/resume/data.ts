import type { ResumeBuilderData, ResumeDashboardData } from "./types"

const resumeDashboardData: ResumeDashboardData = {
  resumes: [
    {
      id: "resume_01",
      title: "Product Designer Resume",
      atsScore: 92,
      updatedAt: "2 hours ago",
      status: "ready",
      template: "Nebula Pro",
      fileType: "PDF",
      size: "1.2 MB",
      summary: "Best fit for product and design roles with strong portfolio storytelling.",
      sectionCoverage: [
        { label: "Summary", value: 96 },
        { label: "Experience", value: 88 },
        { label: "Skills", value: 92 },
      ],
      resumeUrl: "#",
    },
    {
      id: "resume_02",
      title: "Frontend Engineer Resume",
      atsScore: 77,
      updatedAt: "Yesterday",
      status: "optimized",
      template: "Quantum Grid",
      fileType: "DOCX",
      size: "980 KB",
      summary: "Needs stronger metrics and a cleaner project stack for senior roles.",
      sectionCoverage: [
        { label: "Summary", value: 72 },
        { label: "Experience", value: 78 },
        { label: "Skills", value: 81 },
      ],
      resumeUrl: "#",
    },
    {
      id: "resume_03",
      title: "Career Switcher Resume",
      atsScore: 58,
      updatedAt: "4 days ago",
      status: "draft",
      template: "Astra Minimal",
      fileType: "PDF",
      size: "1.5 MB",
      summary: "Rewrite work history into transferrable outcomes and role-specific achievements.",
      sectionCoverage: [
        { label: "Summary", value: 54 },
        { label: "Experience", value: 49 },
        { label: "Skills", value: 66 },
      ],
      resumeUrl: "#",
    },
  ],
  tips: [
    {
      icon: "spark",
      title: "Quantify every impact",
      description: "Use outcome-driven bullets to increase ATS signal density.",
    },
    {
      icon: "scan",
      title: "Match the job description",
      description: "Tailor skill keywords before each application submission.",
    },
    {
      icon: "bolt",
      title: "Keep sections readable",
      description: "Aim for high contrast, clear hierarchy, and tight spacing.",
    },
  ],
  templates: [
    {
      id: "nebula-pro",
      name: "Nebula Pro",
      selected: true,
      previewGradient: "from-cyan-500 via-blue-500 to-violet-600",
    },
    {
      id: "quantum-grid",
      name: "Quantum Grid",
      selected: false,
      previewGradient: "from-fuchsia-500 via-indigo-500 to-cyan-400",
    },
    {
      id: "astra-minimal",
      name: "Astra Minimal",
      selected: false,
      previewGradient: "from-slate-700 via-slate-900 to-cyan-900",
    },
  ],
  metrics: [
    { label: "Average ATS", value: "76", note: "+8% this month" },
    { label: "Resumes uploaded", value: "12", note: "3 new this week" },
    { label: "Tailored versions", value: "9", note: "2 ready today" },
    { label: "Templates used", value: "4", note: "2 active themes" },
  ],
  lastUpload: "14 minutes ago",
}

export async function loadResumeDashboardData(): Promise<ResumeDashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return resumeDashboardData
}

const resumeBuilderData: ResumeBuilderData = {
  themes: [
    {
      id: "obsidian",
      name: "Obsidian Neon",
      description: "Dark canvas with cyan and violet highlights.",
      accent: "from-cyan-500 via-violet-500 to-fuchsia-500",
      selected: true,
    },
    {
      id: "graphite",
      name: "Graphite Blue",
      description: "Editorial dark mode with blue accent lines.",
      accent: "from-sky-500 via-blue-500 to-slate-700",
      selected: false,
    },
    {
      id: "emerald",
      name: "Midnight Emerald",
      description: "Quiet dark theme with green performance accents.",
      accent: "from-emerald-400 via-cyan-400 to-slate-800",
      selected: false,
    },
  ],
  fonts: [
    { id: "manrope", name: "Manrope", family: "var(--font-sans)", selected: true },
    { id: "space", name: "Space Grotesk", family: "var(--font-heading)", selected: false },
    { id: "mono", name: "JetBrains Mono", family: "var(--font-mono)", selected: false },
  ],
  sections: [
    { id: "summary", title: "Summary", description: "Short career snapshot with value proposition.", completed: true },
    { id: "experience", title: "Experience", description: "Impact, metrics and responsibilities.", completed: true },
    { id: "education", title: "Education", description: "Degree, focus, and notable achievements.", completed: true },
    { id: "skills", title: "Skills", description: "Keywords tailored for ATS matching.", completed: true },
    { id: "projects", title: "Projects", description: "Selected work and case studies.", completed: false },
    { id: "certifications", title: "Certifications", description: "Optional proof points and badges.", completed: false },
  ],
}

export async function loadResumeBuilderData(): Promise<ResumeBuilderData> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return resumeBuilderData
}