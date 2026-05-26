"use client"

import {
  ChevronDown,
  Download,
  Edit3,
  Eye,
  FileDown,
  Plus,
  RotateCcw,
  Upload,
  X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { getLatestResume, saveResumeDraft } from "@/features/resume/api/resume-builder.api"
import type {
  ResumeBuilderContent,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLink,
  ResumeProject,
  ResumeStatus,
} from "@/features/resume/types/resume-builder.types"

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

const emptyResume: ResumeBuilderContent = {
  title: "Untitled Resume",
  personal: {
    fullName: "",
    email: "",
    country: "Bangladesh",
    phone: "",
    location: "",
  },
  links: [
    { id: createId(), label: "LinkedIn", url: "" },
    { id: createId(), label: "GitHub", url: "" },
    { id: createId(), label: "Portfolio", url: "" },
  ],
  summary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  references: null,
  settings: {
    themeId: "obsidian",
    fontId: "manrope",
  },
}

const availableFonts = [
  { id: "manrope", label: "Manrope", family: "var(--font-sans)" },
  { id: "space", label: "Space Grotesk", family: "var(--font-heading)" },
  { id: "mono", label: "JetBrains Mono", family: "var(--font-mono)" },
]

const availableThemes = [
  {
    id: "obsidian",
    label: "Obsidian Neon",
    accent: "text-cyan-600",
    badge: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "graphite",
    label: "Graphite Blue",
    accent: "text-slate-700",
    badge: "bg-slate-100 text-slate-700",
  },
  {
    id: "emerald",
    label: "Midnight Emerald",
    accent: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
]

const autosaveDelay = 1200

export default function ResumeBuilderPage() {
  const user = useAuth((state) => state.user)
  const userId = user?.id
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ResumeBuilderContent>(emptyResume)
  const [skillsMode, setSkillsMode] = useState<"comma" | "single">("comma")
  const [skillsText, setSkillsText] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [sectionOpen, setSectionOpen] = useState({
    appearance: true,
    personal: true,
    summary: true,
    skills: true,
    education: true,
    experience: true,
    projects: true,
    certifications: true,
    references: true,
  })
  const autosaveRef = useRef<number | null>(null)
  const saveInFlightRef = useRef(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const normalizeResume = (content: ResumeBuilderContent | null | undefined): ResumeBuilderContent => {
    if (!content) {
      return emptyResume
    }

    return {
      ...emptyResume,
      ...content,
      personal: {
        ...emptyResume.personal,
        ...(content.personal ?? {}),
      },
      links: Array.isArray(content.links) && content.links.length > 0 ? content.links : emptyResume.links,
      skills: Array.isArray(content.skills) ? content.skills : [],
      education: Array.isArray(content.education) ? content.education : [],
      experience: Array.isArray(content.experience) ? content.experience : [],
      projects: Array.isArray(content.projects) ? content.projects : [],
      certifications: Array.isArray(content.certifications) ? content.certifications : [],
      references: content.references ?? null,
      settings: {
        ...emptyResume.settings,
        ...content.settings,
      },
    }
  }

  const computedTitle = useMemo(() => {
    if (formData.title?.trim()) {
      return formData.title.trim()
    }

    if (formData.personal.fullName.trim()) {
      return `${formData.personal.fullName.trim()} Resume`
    }

    return "Untitled Resume"
  }, [formData.personal.fullName, formData.title])

  const saveStatusLabel = useMemo(() => {
    if (!userId) {
      return "Login to save"
    }
    if (saveState === "saving") {
      return "Saving draft..."
    }
    if (saveState === "error" && saveMessage) {
      return saveMessage
    }
    if (saveState === "saved" && lastSavedAt) {
      return `Draft saved at ${lastSavedAt}`
    }
    return ""
  }, [lastSavedAt, saveMessage, saveState, userId])

  const activeFont = useMemo(
    () => availableFonts.find((font) => font.id === formData.settings.fontId) ?? availableFonts[0],
    [formData.settings.fontId],
  )

  const activeTheme = useMemo(
    () => availableThemes.find((theme) => theme.id === formData.settings.themeId) ?? availableThemes[0],
    [formData.settings.themeId],
  )

  const previewLinks = useMemo(
    () => formData.links.filter((link) => link.label.trim() || link.url.trim()),
    [formData.links],
  )

  const previewEducation = useMemo(
    () =>
      formData.education.filter(
        (entry) =>
          entry.school.trim() ||
          entry.degree.trim() ||
          entry.field.trim() ||
          entry.description.trim(),
      ),
    [formData.education],
  )

  const previewExperience = useMemo(
    () =>
      formData.experience.filter(
        (entry) =>
          entry.company.trim() ||
          entry.role.trim() ||
          entry.description.trim(),
      ),
    [formData.experience],
  )

  const previewProjects = useMemo(
    () =>
      formData.projects.filter(
        (entry) => entry.name.trim() || entry.role.trim() || entry.description.trim(),
      ),
    [formData.projects],
  )

  const previewCertifications = useMemo(
    () =>
      formData.certifications.filter(
        (entry) => entry.name.trim() || entry.issuer.trim() || entry.date.trim(),
      ),
    [formData.certifications],
  )

  const updateFormData = (updater: (prev: ResumeBuilderContent) => ResumeBuilderContent) => {
    setFormData((prev) => updater(prev))
    setIsDirty(true)
  }

  const toggleSection = (key: keyof typeof sectionOpen) => {
    setSectionOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const saveDraft = async (status: ResumeStatus = "DRAFT") => {
    if (!userId || saveInFlightRef.current) {
      return
    }

    saveInFlightRef.current = true
    setSaveState("saving")
    setSaveMessage(null)

    try {
      const payload = {
        userId,
        resumeId: resumeId ?? undefined,
        status,
        title: computedTitle,
        content: {
          ...formData,
          title: computedTitle,
        },
      }

      const result = await saveResumeDraft(payload)
      setResumeId(result.id)
      setSaveState("saved")
      setLastSavedAt(new Date(result.updatedAt).toLocaleTimeString())
      setIsDirty(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save draft."
      setSaveState("error")
      setSaveMessage(message)
    } finally {
      saveInFlightRef.current = false
    }
  }

  const handleReset = () => {
    setFormData(emptyResume)
    setResumeId(null)
    setSkillsText("")
    setIsDirty(true)
  }

  const handleThemeChange = (value: string) => {
    updateFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        themeId: value,
      },
    }))
  }

  const handleFontChange = (value: string) => {
    updateFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        fontId: value,
      },
    }))
  }

  const handleExportJson = () => {
    const safeTitle = computedTitle.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "")
    const fileName = `${safeTitle || "resume"}.json`
    const payload = {
      ...formData,
      title: computedTitle,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadPdf = () => {
    const originalTitle = document.title
    setShowPreview(true)
    window.setTimeout(() => {
      document.title = " "
      window.print()
      document.title = originalTitle
    }, 200)
  }

  useEffect(() => {
    if (!userId) {
      setIsReady(true)
      return
    }

    let isMounted = true
    setIsReady(false)

    getLatestResume(userId, "DRAFT")
      .then((draft) => {
        if (!isMounted) return
        if (draft?.content) {
          const normalized = normalizeResume(draft.content)
          setFormData(normalized)
          setResumeId(draft.id)
          setSkillsText(normalized.skills.join(", "))
        }
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "Failed to load draft."
        setSaveState("error")
        setSaveMessage(message)
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true)
        }
      })

    return () => {
      isMounted = false
    }
  }, [userId])

  useEffect(() => {
    if (!isReady || !userId || !isDirty) {
      return
    }

    if (autosaveRef.current) {
      window.clearTimeout(autosaveRef.current)
    }

    autosaveRef.current = window.setTimeout(() => {
      void saveDraft("DRAFT")
    }, autosaveDelay)

    return () => {
      if (autosaveRef.current) {
        window.clearTimeout(autosaveRef.current)
      }
    }
  }, [formData, isDirty, isReady, userId])

  useEffect(() => {
    if (skillsMode === "comma") {
      setSkillsText(formData.skills.join(", "))
    }
  }, [formData.skills, skillsMode])

  const handlePersonalChange = (field: keyof ResumeBuilderContent["personal"], value: string) => {
    updateFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }))
  }

  const handleLinkChange = (id: string, field: keyof ResumeLink, value: string) => {
    updateFormData((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    }))
  }

  const handleAddLink = () => {
    updateFormData((prev) => ({
      ...prev,
      links: [...prev.links, { id: createId(), label: "", url: "" }],
    }))
  }

  const handleRemoveLink = (id: string) => {
    updateFormData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }))
  }

  const handleSkillsTextChange = (value: string) => {
    setSkillsText(value)
    const parsed = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)

    updateFormData((prev) => ({
      ...prev,
      skills: parsed,
    }))
  }

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return

    updateFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmed],
    }))
    setSkillInput("")
  }

  const handleRemoveSkill = (skill: string) => {
    updateFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }))
  }

  const addEducation = () => {
    const entry: ResumeEducation = {
      id: createId(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      location: "",
      description: "",
    }

    updateFormData((prev) => ({
      ...prev,
      education: [...prev.education, entry],
    }))
  }

  const handleEducationChange = (
    id: string,
    field: keyof ResumeEducation,
    value: string,
  ) => {
    updateFormData((prev) => ({
      ...prev,
      education: prev.education.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    }))
  }

  const removeEducation = (id: string) => {
    updateFormData((prev) => ({
      ...prev,
      education: prev.education.filter((entry) => entry.id !== id),
    }))
  }

  const addExperience = () => {
    const entry: ResumeExperience = {
      id: createId(),
      company: "",
      role: "",
      location: "",
      startYear: "",
      endYear: "",
      description: "",
    }

    updateFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, entry],
    }))
  }

  const handleExperienceChange = (
    id: string,
    field: keyof ResumeExperience,
    value: string,
  ) => {
    updateFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    }))
  }

  const removeExperience = (id: string) => {
    updateFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((entry) => entry.id !== id),
    }))
  }

  const addProject = () => {
    const entry: ResumeProject = {
      id: createId(),
      name: "",
      role: "",
      link: "",
      description: "",
    }

    updateFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, entry],
    }))
  }

  const handleProjectChange = (
    id: string,
    field: keyof ResumeProject,
    value: string,
  ) => {
    updateFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    }))
  }

  const removeProject = (id: string) => {
    updateFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((entry) => entry.id !== id),
    }))
  }

  const addCertification = () => {
    const entry: ResumeCertification = {
      id: createId(),
      name: "",
      issuer: "",
      date: "",
      credentialUrl: "",
    }

    updateFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, entry],
    }))
  }

  const handleCertificationChange = (
    id: string,
    field: keyof ResumeCertification,
    value: string,
  ) => {
    updateFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    }))
  }

  const removeCertification = (id: string) => {
    updateFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((entry) => entry.id !== id),
    }))
  }

  const handleReferenceFile = (file: File | null) => {
    if (!file) {
      updateFormData((prev) => ({
        ...prev,
        references: null,
      }))
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : ""
      updateFormData((prev) => ({
        ...prev,
        references: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          dataUrl,
        },
      }))
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5 pb-10">
      <header>
        <h1 className="text-2xl font-heading font-semibold text-foreground sm:text-3xl">
          Resume Builder
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a professional resume with live preview.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={showPreview ? "outline" : "default"}
          size="sm"
          className="rounded-full"
          onClick={() => setShowPreview(false)}
        >
          <Edit3 className="size-3" />
          Edit
        </Button>
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setShowPreview(true)}
        >
          <Eye className="size-3" />
          Preview
        </Button>
        <Button size="sm" className="rounded-full" onClick={handleDownloadPdf}>
          <Download className="size-3" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => void saveDraft("DRAFT")}
          disabled={!userId || saveState === "saving"}
        >
          {saveState === "saving" ? "Saving..." : "Save Draft"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={handleExportJson}
        >
          <FileDown className="size-3" />
          Export JSON
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="rounded-full"
          onClick={handleReset}
        >
          <RotateCcw className="size-3" />
          Reset
        </Button>
        {saveStatusLabel ? (
          <span className="text-xs text-muted-foreground">{saveStatusLabel}</span>
        ) : null}
      </div>

      {showPreview ? (
        <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader>
            <CardTitle className="text-base">Live Preview</CardTitle>
            <CardDescription>Updates as you type.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="resume-print-preview" style={{ fontFamily: activeFont.family }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {formData.personal.fullName.trim() || "Your Name"}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[
                      formData.personal.email.trim(),
                      formData.personal.phone.trim(),
                      formData.personal.location.trim(),
                    ]
                      .filter(Boolean)
                      .join(" • ") || "email@domain.com"}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${activeTheme.badge}`}>
                  {computedTitle}
                </span>
              </div>

              {previewLinks.length ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {previewLinks.map((link) => (
                    <span key={link.id} className="rounded-full border border-slate-200 px-3 py-1">
                      {link.label || "Link"}{link.url ? `: ${link.url}` : ""}
                    </span>
                  ))}
                </div>
              ) : null}

              {formData.summary.trim() ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Summary
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                    {formData.summary}
                  </p>
                </div>
              ) : null}

              {formData.skills.length ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-slate-200 px-3 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {previewExperience.length ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Experience
                  </p>
                  <div className="mt-3 space-y-3">
                    {previewExperience.map((entry) => (
                      <div key={entry.id} className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {entry.role || "Role"}{entry.company ? ` · ${entry.company}` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[entry.location, entry.startYear, entry.endYear].filter(Boolean).join(" • ")}
                        </p>
                        {entry.description.trim() ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {previewEducation.length ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Education
                  </p>
                  <div className="mt-3 space-y-3">
                    {previewEducation.map((entry) => (
                      <div key={entry.id} className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {entry.school || "School"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[entry.degree, entry.field, entry.startYear, entry.endYear]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                        {entry.description.trim() ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {previewProjects.length ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Projects
                  </p>
                  <div className="mt-3 space-y-3">
                    {previewProjects.map((entry) => (
                      <div key={entry.id} className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {entry.name || "Project"}{entry.role ? ` · ${entry.role}` : ""}
                        </p>
                        {entry.link.trim() ? (
                          <p className="text-xs text-muted-foreground">{entry.link}</p>
                        ) : null}
                        {entry.description.trim() ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {previewCertifications.length ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    Certifications
                  </p>
                  <div className="mt-3 space-y-2">
                    {previewCertifications.map((entry) => (
                      <div key={entry.id} className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {entry.name || "Certification"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[entry.issuer, entry.date].filter(Boolean).join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {formData.references ? (
                <div className="mt-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${activeTheme.accent}`}>
                    References
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formData.references.fileName}
                  </p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("appearance")}
            >
              <div>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Choose a theme and font for preview.</CardDescription>
              </div>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.appearance ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.appearance ? (
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Theme</label>
                  <select
                    className="h-9 w-full rounded-lg border border-input bg-background/80 px-3 text-sm text-foreground dark:bg-white/[0.03]"
                    value={formData.settings.themeId}
                    onChange={(event) => handleThemeChange(event.target.value)}
                  >
                    {availableThemes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Font</label>
                  <select
                    className="h-9 w-full rounded-lg border border-input bg-background/80 px-3 text-sm text-foreground dark:bg-white/[0.03]"
                    value={formData.settings.fontId}
                    onChange={(event) => handleFontChange(event.target.value)}
                  >
                    {availableFonts.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("personal")}
            >
              <div>
                <CardTitle className="text-base">Personal Details</CardTitle>
                <CardDescription>Contact Information</CardDescription>
              </div>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.personal ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.personal ? (
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
                    <Input
                      placeholder="Full name"
                      value={formData.personal.fullName}
                      onChange={(event) => handlePersonalChange("fullName", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Email *</label>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={formData.personal.email}
                      onChange={(event) => handlePersonalChange("email", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Country</label>
                    <select
                      className="h-9 w-full rounded-lg border border-input bg-background/80 px-3 text-sm text-foreground dark:bg-white/[0.03]"
                      value={formData.personal.country}
                      onChange={(event) => handlePersonalChange("country", event.target.value)}
                    >
                      <option>Bangladesh</option>
                      <option>India</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                    <Input
                      placeholder="+880"
                      value={formData.personal.phone}
                      onChange={(event) => handlePersonalChange("phone", event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Location</label>
                  <Input
                    placeholder="City, State, Country"
                    value={formData.personal.location}
                    onChange={(event) => handlePersonalChange("location", event.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">Social Profiles & Links</p>
                    <span className="text-xs text-muted-foreground">Platform / URL</span>
                  </div>
                  {formData.links.map((link) => (
                    <div key={link.id} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                      <Input
                        placeholder="Platform"
                        value={link.label}
                        onChange={(event) => handleLinkChange(link.id, "label", event.target.value)}
                      />
                      <Input
                        placeholder="https://"
                        value={link.url}
                        onChange={(event) => handleLinkChange(link.id, "url", event.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Remove"
                        onClick={() => handleRemoveLink(link.id)}
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full" onClick={handleAddLink}>
                    <Plus className="size-3" />
                    Add Profile Link
                  </Button>
                </div>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("summary")}
            >
              <div>
                <CardTitle className="text-base">Professional Summary</CardTitle>
                <CardDescription>Write a compelling summary with line breaks.</CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={(event) => {
                  event.stopPropagation()
                  setShowPreview(true)
                }}
              >
                Preview
              </Button>
            </CardHeader>
            {sectionOpen.summary ? (
              <CardContent>
                <Textarea
                  placeholder="Write a compelling professional summary. Use line breaks for formatting."
                  className="min-h-32"
                  value={formData.summary}
                  onChange={(event) =>
                    updateFormData((prev) => ({
                      ...prev,
                      summary: event.target.value,
                    }))
                  }
                />
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("skills")}
            >
              <div>
                <CardTitle className="text-base">Skills</CardTitle>
                <CardDescription>Comma separated or add one by one.</CardDescription>
              </div>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.skills ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.skills ? (
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="rounded-full"
                    variant={skillsMode === "comma" ? "default" : "outline"}
                    onClick={() => setSkillsMode("comma")}
                  >
                    Comma Separated
                  </Button>
                  <Button
                    variant={skillsMode === "single" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSkillsMode("single")}
                  >
                    Add One by One
                  </Button>
                </div>
                {skillsMode === "comma" ? (
                  <Textarea
                    placeholder="Enter skills separated by commas"
                    className="min-h-24"
                    value={skillsText}
                    onChange={(event) => handleSkillsTextChange(event.target.value)}
                  />
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      placeholder="Add a skill"
                      value={skillInput}
                      onChange={(event) => setSkillInput(event.target.value)}
                    />
                    <Button className="rounded-full" onClick={handleAddSkill}>
                      <Plus className="size-3" />
                      Add Skill
                    </Button>
                  </div>
                )}
                {formData.skills.length ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-foreground"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
                  {formData.skills.length} skills added
                </div>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("education")}
            >
              <CardTitle className="text-base">Education</CardTitle>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.education ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.education ? (
              <CardContent className="space-y-4">
                {formData.education.map((entry) => (
                  <div key={entry.id} className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Entry</p>
                      <Button variant="ghost" size="icon-sm" onClick={() => removeEducation(entry.id)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        placeholder="School"
                        value={entry.school}
                        onChange={(event) => handleEducationChange(entry.id, "school", event.target.value)}
                      />
                      <Input
                        placeholder="Degree"
                        value={entry.degree}
                        onChange={(event) => handleEducationChange(entry.id, "degree", event.target.value)}
                      />
                      <Input
                        placeholder="Field of study"
                        value={entry.field}
                        onChange={(event) => handleEducationChange(entry.id, "field", event.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={entry.location}
                        onChange={(event) => handleEducationChange(entry.id, "location", event.target.value)}
                      />
                      <Input
                        placeholder="Start year"
                        value={entry.startYear}
                        onChange={(event) => handleEducationChange(entry.id, "startYear", event.target.value)}
                      />
                      <Input
                        placeholder="End year"
                        value={entry.endYear}
                        onChange={(event) => handleEducationChange(entry.id, "endYear", event.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Notes or achievements"
                      value={entry.description}
                      onChange={(event) => handleEducationChange(entry.id, "description", event.target.value)}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-full" onClick={addEducation}>
                  <Plus className="size-3" />
                  Add Education
                </Button>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("experience")}
            >
              <CardTitle className="text-base">Work Experience</CardTitle>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.experience ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.experience ? (
              <CardContent className="space-y-4">
                {formData.experience.map((entry) => (
                  <div key={entry.id} className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Entry</p>
                      <Button variant="ghost" size="icon-sm" onClick={() => removeExperience(entry.id)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Company"
                        value={entry.company}
                        onChange={(event) => handleExperienceChange(entry.id, "company", event.target.value)}
                      />
                      <Input
                        placeholder="Role"
                        value={entry.role}
                        onChange={(event) => handleExperienceChange(entry.id, "role", event.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={entry.location}
                        onChange={(event) => handleExperienceChange(entry.id, "location", event.target.value)}
                      />
                      <Input
                        placeholder="Start year"
                        value={entry.startYear}
                        onChange={(event) => handleExperienceChange(entry.id, "startYear", event.target.value)}
                      />
                      <Input
                        placeholder="End year"
                        value={entry.endYear}
                        onChange={(event) => handleExperienceChange(entry.id, "endYear", event.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Describe impact and responsibilities"
                      value={entry.description}
                      onChange={(event) => handleExperienceChange(entry.id, "description", event.target.value)}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-full" onClick={addExperience}>
                  <Plus className="size-3" />
                  Add Experience
                </Button>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("projects")}
            >
              <CardTitle className="text-base">Projects</CardTitle>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.projects ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.projects ? (
              <CardContent className="space-y-4">
                {formData.projects.map((entry) => (
                  <div key={entry.id} className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Entry</p>
                      <Button variant="ghost" size="icon-sm" onClick={() => removeProject(entry.id)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Project name"
                        value={entry.name}
                        onChange={(event) => handleProjectChange(entry.id, "name", event.target.value)}
                      />
                      <Input
                        placeholder="Your role"
                        value={entry.role}
                        onChange={(event) => handleProjectChange(entry.id, "role", event.target.value)}
                      />
                      <Input
                        placeholder="Project link"
                        value={entry.link}
                        onChange={(event) => handleProjectChange(entry.id, "link", event.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Project summary"
                      value={entry.description}
                      onChange={(event) => handleProjectChange(entry.id, "description", event.target.value)}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-full" onClick={addProject}>
                  <Plus className="size-3" />
                  Add Project
                </Button>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("certifications")}
            >
              <CardTitle className="text-base">Certificates</CardTitle>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.certifications ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.certifications ? (
              <CardContent className="space-y-4">
                {formData.certifications.map((entry) => (
                  <div key={entry.id} className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Entry</p>
                      <Button variant="ghost" size="icon-sm" onClick={() => removeCertification(entry.id)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Certification name"
                        value={entry.name}
                        onChange={(event) => handleCertificationChange(entry.id, "name", event.target.value)}
                      />
                      <Input
                        placeholder="Issuer"
                        value={entry.issuer}
                        onChange={(event) => handleCertificationChange(entry.id, "issuer", event.target.value)}
                      />
                      <Input
                        placeholder="Date"
                        value={entry.date}
                        onChange={(event) => handleCertificationChange(entry.id, "date", event.target.value)}
                      />
                      <Input
                        placeholder="Credential URL"
                        value={entry.credentialUrl}
                        onChange={(event) => handleCertificationChange(entry.id, "credentialUrl", event.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-full" onClick={addCertification}>
                  <Plus className="size-3" />
                  Add Certificate
                </Button>
              </CardContent>
            ) : null}
          </Card>

          <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader
              className="flex cursor-pointer flex-row items-center justify-between"
              onClick={() => toggleSection("references")}
            >
              <div>
                <CardTitle className="text-base">References (PDF)</CardTitle>
                <CardDescription>Upload PDF references.</CardDescription>
              </div>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform ${
                  sectionOpen.references ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
            {sectionOpen.references ? (
              <CardContent>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-2xl border border-dashed border-border/70 bg-background/60 px-6 py-8 text-center text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <Upload className="mx-auto size-6 text-muted-foreground" />
                  <p className="mt-2 text-sm text-foreground">
                    {formData.references?.fileName
                      ? `Uploaded: ${formData.references.fileName}`
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">PDF only, max 5MB</p>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => handleReferenceFile(event.target.files?.[0] ?? null)}
                />
                {formData.references ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleReferenceFile(null)}
                  >
                    <X className="size-3" />
                    Remove attachment
                  </Button>
                ) : null}
              </CardContent>
            ) : null}
          </Card>
        </div>
      )}

      <style jsx global>{`
        .resume-print-preview {
          margin: 0 auto;
          width: min(210mm, 100%);
          min-height: 297mm;
          padding: 18mm 16mm;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
        }
        .resume-print-preview .text-muted-foreground {
          color: #475569;
        }
        .resume-print-preview .text-foreground {
          color: #0f172a;
        }
        @media print {
          body {
            margin: 0;
          }
          body * {
            visibility: hidden !important;
          }
          .resume-print-preview,
          .resume-print-preview * {
            visibility: visible !important;
          }
          .resume-print-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            padding: 18mm 16mm;
            border: none !important;
            border-radius: 0;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          @page {
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}
