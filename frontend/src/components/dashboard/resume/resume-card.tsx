"use client"

import { motion } from "framer-motion"
import { Download, FilePenLine, MoreHorizontal, Sparkles, WandSparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { ATSScoreCard } from "./ats-score-card"
import type { ResumeItem } from "./types"

type ResumeCardProps = {
  resume: ResumeItem
}

function getAtsTone(score: number) {
  if (score >= 80) return "emerald"
  if (score >= 60) return "amber"
  return "rose"
}

function ResumeCard({ resume }: ResumeCardProps) {
  const tone = getAtsTone(resume.atsScore)

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,30,0.95),rgba(4,8,20,0.88))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]",
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.14),_transparent_36%)]" />
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                {resume.fileType} • {resume.size}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em]",
                  tone === "emerald"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : tone === "amber"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-rose-400/15 text-rose-300",
                )}
              >
                {resume.status}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {resume.title}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                {resume.summary}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Updated {resume.updatedAt}</span>
              <span className="size-1 rounded-full bg-white/20" />
              <span>{resume.template}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" className="rounded-full border-white/10 bg-white/[0.03]">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-2xl border-white/10 bg-[#070b18]/95 backdrop-blur-xl">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <ATSScoreCard score={resume.atsScore} compact />
            <div className="space-y-2">
              {resume.sectionCoverage.map((section) => (
                <div key={section.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{section.label}</span>
                    <span>{section.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div
                      className={cn(
                        "h-2 rounded-full bg-gradient-to-r",
                        tone === "emerald"
                          ? "from-emerald-400 to-cyan-400"
                          : tone === "amber"
                            ? "from-amber-300 to-orange-400"
                            : "from-rose-400 to-orange-500",
                      )}
                      style={{ width: `${section.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="size-3 text-cyan-300" />
              Ready to act
            </div>
            <p className="text-sm text-muted-foreground">
              Use AI to fine-tune keywords, adjust structure, or tailor this version for a specific job.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="outline" className="justify-start rounded-2xl border-white/10 bg-white/[0.03] py-6">
                <FilePenLine className="size-4" />
                Edit
              </Button>
              <Button className="justify-start rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 py-6 text-white">
                <Sparkles className="size-4" />
                Analyze
              </Button>
              <Button variant="outline" className="justify-start rounded-2xl border-white/10 bg-white/[0.03] py-6">
                <Download className="size-4" />
                Download
              </Button>
              <Button variant="ghost" className="justify-start rounded-2xl bg-white/[0.03] py-6">
                <WandSparkles className="size-4" />
                Tailor for Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export { ResumeCard }