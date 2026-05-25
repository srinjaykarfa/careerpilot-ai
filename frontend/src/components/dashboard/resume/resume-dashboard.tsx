"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, CloudUpload, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/features/auth/hooks/use-auth"
import {
  checkAtsScore,
  getAtsHistory,
  getAtsHistoryDetail,
  type AtsHistoryItem,
} from "@/features/resume/api/ats.api"

function ResumeDashboard() {
  const [mode, setMode] = useState<"paste" | "select">("paste")
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState("job-1")
  const [jobDescription, setJobDescription] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [history, setHistory] = useState<AtsHistoryItem[]>([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null)
  const [result, setResult] = useState<{
    score: number
    matched: string[]
    missing: string[]
    summary?: string
    sectionScores?: Array<{ section: string; score: number; notes: string }>
    recommendations?: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const user = useAuth((state) => state.user)
  const userId = user?.id

  const jobs = useMemo(
    () => [
      {
        id: "job-1",
        title: "Product Designer",
        description:
          "Design user flows, collaborate with product managers, create wireframes, run usability testing, build UI systems, and translate insights into product improvements.",
      },
      {
        id: "job-2",
        title: "Frontend Engineer",
        description:
          "Build React interfaces, optimize performance, integrate APIs, work with TypeScript, and collaborate with designers to ship responsive UI components.",
      },
      {
        id: "job-3",
        title: "Data Analyst",
        description:
          "Analyze datasets with SQL and Python, build dashboards, communicate insights, and create data-driven recommendations for stakeholders.",
      },
    ],
    [],
  )

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId)
    const job = jobs.find((item) => item.id === jobId)
    setJobDescription(job?.description ?? "")
  }

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId) ?? jobs[0],
    [jobs, selectedJobId],
  )

  const handleFileChange = (file: File | null) => {
    setResumeFile(file)
  }

  const loadHistory = async () => {
    if (!userId) {
      setHistory([])
      return
    }

    try {
      setIsHistoryLoading(true)
      setHistoryError(null)
      const items = await getAtsHistory(userId)
      setHistory(items)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load history."
      setHistoryError(message)
    } finally {
      setIsHistoryLoading(false)
    }
  }

  const handleCheck = async () => {
    setError(null)

    if (!resumeFile) {
      setError("Please upload a resume before checking ATS score.")
      return
    }

    if (!jobDescription.trim()) {
      setError("Please add a job description to run ATS check.")
      return
    }

    try {
      setIsChecking(true)
      const data = await checkAtsScore(resumeFile, jobDescription, userId)
      setResult({
        score: data.score,
        matched: data.matchedKeywords,
        missing: data.missingKeywords,
        summary: data.summary,
        sectionScores: data.sectionScores,
        recommendations: data.recommendations,
      })
      if (data.historyId) {
        const detail = await getAtsHistoryDetail(data.historyId)
        setSelectedHistory(detail)
      }
      await loadHistory()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to check ATS score."
      setError(message)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    void loadHistory()
  }, [userId])

  return (
    <div className="space-y-6 pb-10">
      <section className="text-center">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Search className="size-3" />
            ATS Score Check
          </div>
          <h1 className="mt-4 text-3xl font-heading font-semibold text-foreground">ATS Score Check</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Analyze your resume against job descriptions using keyword matching.
          </p>
          <div className="mt-4 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs text-amber-200">
            ATS score is an estimation based on keyword matching. Actual recruiter ATS systems may vary.
          </div>
        </div>
      </section>

      <section>
        <Card className="mx-auto w-full max-w-3xl border-border/60 bg-card/80 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader>
            <CardTitle className="text-lg">Upload Resume</CardTitle>
            <CardDescription>Upload a PDF or DOCX to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-2xl border border-dashed border-border/70 bg-background/60 p-6 text-center text-sm text-muted-foreground transition-colors hover:border-border dark:border-white/10 dark:bg-white/[0.03]"
            >
              <CloudUpload className="mx-auto size-6 text-cyan-300" />
              <p className="mt-2 text-sm text-foreground">
                {resumeFile ? `Uploaded: ${resumeFile.name}` : "Click to upload resume"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">PDF or DOCX (Max 5MB)</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
            />
            <p className="text-center text-xs text-muted-foreground">
              Don&apos;t have any resume?{" "}
              <Link href="/dashboard/resume/builder" className="font-semibold text-foreground hover:underline">
                Create one
              </Link>
            </p>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="rounded-full"
                  variant={mode === "paste" ? "default" : "outline"}
                  onClick={() => setMode("paste")}
                >
                  Paste Description
                </Button>
                <Button
                  size="sm"
                  variant={mode === "select" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => {
                    setMode("select")
                    handleSelectJob(selectedJobId)
                  }}
                >
                  Select Existing Job
                </Button>
              </div>
              {mode === "select" ? (
                <DropdownMenu open={isJobMenuOpen} onOpenChange={setIsJobMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between rounded-lg border-border/60 bg-background/60 text-sm text-foreground dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      {selectedJob?.title ?? "Select job"}
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    onMouseLeave={() => setIsJobMenuOpen(false)}
                    className="w-[--radix-dropdown-menu-trigger-width] rounded-xl border-border/60 bg-background/95 p-1 shadow-lg backdrop-blur dark:border-white/10 dark:bg-[#0b0f1a]/95"
                  >
                    {jobs.map((job) => (
                      <DropdownMenuItem
                        key={job.id}
                        className="rounded-lg px-2 py-2 text-sm"
                        onClick={() => {
                          handleSelectJob(job.id)
                          setIsJobMenuOpen(false)
                        }}
                      >
                        {job.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
              <Textarea
                placeholder="Paste the full job description here..."
                className="min-h-40 rounded-2xl border-border/60 bg-background/60 text-sm dark:border-white/10 dark:bg-white/[0.03]"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button
              className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
              onClick={handleCheck}
              disabled={isChecking}
            >
              <Search className="size-4" />
              {isChecking ? "Checking..." : "Check ATS Score"}
            </Button>

            {result ? (
              <div className="rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    ATS score
                  </p>
                  <span className="text-lg font-semibold text-foreground">{result.score}</span>
                </div>
                {result.summary ? (
                  <p className="mt-2 text-sm text-foreground">{result.summary}</p>
                ) : null}
                {result.sectionScores?.length ? (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {result.sectionScores.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-xl border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                          <span>{section.section}</span>
                          <span className="text-foreground">{section.score}</span>
                        </div>
                        <p className="mt-2 text-sm text-foreground">{section.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Matched keywords</p>
                  <p className="mt-2 text-sm text-foreground">
                    {result.matched.length ? result.matched.join(", ") : "No matches found"}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Missing keywords</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result.missing.length ? result.missing.slice(0, 8).join(", ") : "All key terms matched"}
                  </p>
                </div>
                {result.recommendations?.length ? (
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Recommendations
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {result.recommendations.slice(0, 6).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  History
                </p>
                <span className="text-xs text-muted-foreground">
                  {userId ? "Saved ATS checks" : "Login to save history"}
                </span>
              </div>
              {historyError ? (
                <p className="mt-2 text-sm text-destructive">{historyError}</p>
              ) : null}
              {isHistoryLoading ? (
                <p className="mt-2 text-sm text-muted-foreground">Loading history...</p>
              ) : null}
              {!isHistoryLoading && history.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">No ATS history yet.</p>
              ) : null}
              <div className="mt-3 space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.fileName}</p>
                      <p className="text-[0.7rem] text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{item.score}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={async () => {
                          const detail = await getAtsHistoryDetail(item.id)
                          setSelectedHistory(detail)
                        }}
                      >
                        View details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedHistory ? (
                <div className="mt-4 rounded-xl border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Details
                  </p>
                  <p className="mt-2 text-sm text-foreground">{selectedHistory.summary}</p>
                  {Array.isArray(selectedHistory.sectionScores) ? (
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {selectedHistory.sectionScores.map((section: any) => (
                        <div
                          key={`${section.section}-${section.score}`}
                          className="rounded-lg border border-border/60 bg-background/60 p-2 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]"
                        >
                          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                            <span>{section.section}</span>
                            <span className="text-foreground">{section.score}</span>
                          </div>
                          <p className="mt-2 text-sm text-foreground">{section.notes}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {Array.isArray(selectedHistory.recommendations) ? (
                    <div className="mt-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Recommendations
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {selectedHistory.recommendations.slice(0, 6).map((item: string) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { ResumeDashboard }