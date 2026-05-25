"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Download, Edit3, Layers3, Sparkles, WandSparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import type { ResumeBuilderData } from "./types"

type ResumeBuilderProps = {
  data: ResumeBuilderData
}

function ResumeBuilder({ data }: ResumeBuilderProps) {
  const [selectedThemeId, setSelectedThemeId] = useState(
    data.themes.find((theme) => theme.selected)?.id ?? data.themes[0]?.id ?? "",
  )
  const [selectedFontId, setSelectedFontId] = useState(
    data.fonts.find((font) => font.selected)?.id ?? data.fonts[0]?.id ?? "",
  )

  const selectedTheme = useMemo(
    () => data.themes.find((theme) => theme.id === selectedThemeId) ?? data.themes[0],
    [data.themes, selectedThemeId],
  )
  const selectedFont = useMemo(
    () => data.fonts.find((font) => font.id === selectedFontId) ?? data.fonts[0],
    [data.fonts, selectedFontId],
  )

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <Card className="border-white/10 bg-[linear-gradient(180deg,rgba(8,10,20,0.96),rgba(4,6,14,0.92))] shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Edit3 className="size-3 text-cyan-300" />
              Builder controls
            </div>
            <CardTitle className="text-2xl">Shape your resume in real time</CardTitle>
            <CardDescription>
              Switch theme, change font, and control sections before downloading.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Fonts
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {data.fonts.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setSelectedFontId(font.id)}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-left transition-all",
                      selectedFontId === font.id
                        ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20",
                    )}
                    style={{ fontFamily: font.family }}
                  >
                    <div className="text-sm font-medium text-foreground">{font.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Preview text</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Theme
              </p>
              <div className="space-y-2">
                {data.themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all",
                      selectedThemeId === theme.id
                        ? "border-white/20 bg-white/[0.05]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20",
                    )}
                  >
                    <span className={cn("size-10 rounded-2xl bg-gradient-to-br", theme.accent)} />
                    <span>
                      <span className="block text-sm font-medium text-foreground">{theme.name}</span>
                      <span className="block text-xs text-muted-foreground">{theme.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Sections
              </p>
              <div className="space-y-2">
                {data.sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{section.title}</div>
                      <div className="text-xs text-muted-foreground">{section.description}</div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em]",
                        section.completed
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-white/5 text-muted-foreground",
                      )}
                    >
                      {section.completed ? "Included" : "Optional"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                Save draft
              </Button>
              <Button variant="outline" className="flex-1 rounded-full border-white/10 bg-white/[0.03]">
                <Download className="size-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Why this builder feels premium</CardTitle>
            <CardDescription>
              Same layout can support multiple themes, fonts, and AI rewrite flows without changing the route.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Summary + experience editing",
                "Theme / font switching",
                "Section-by-section export",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,10,20,0.96),rgba(4,6,14,0.94))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_34%)]" />
        <div className="relative flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Live preview
            </p>
            <h2 className="mt-1 text-2xl font-heading font-semibold text-foreground">
              {selectedTheme?.name}
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground" style={{ fontFamily: selectedFont?.family }}>
            Font: {selectedFont?.name}
          </div>
        </div>

        <div className="relative mt-5 space-y-5" style={{ fontFamily: selectedFont?.family }}>
          <div className="rounded-[28px] border border-white/10 bg-black/35 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Summary</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">Senior Product Designer</h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Designing human-centered products across mobile and web, with a focus on conversion, storytelling,
                  and measurable business outcomes.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-right">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">ATS</div>
                <div className="mt-1 text-3xl font-semibold text-cyan-300">91</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Experience",
                lines: [
                  "Led 3 product launches",
                  "Improved activation by 18%",
                  "Worked with PMs and engineers",
                ],
              },
              {
                title: "Education",
                lines: [
                  "BSc in Computer Science",
                  "Specialized in HCI and UX",
                  "Honors and scholarships",
                ],
              },
              {
                title: "Skills",
                lines: [
                  "Figma, Framer, Design Systems",
                  "Research, wireframing, prototyping",
                  "A/B testing and analytics",
                ],
              },
              {
                title: "Projects",
                lines: [
                  "Portfolio case study system",
                  "Resume generator flow",
                  "Career mentor product mockups",
                ],
              },
            ].map((section) => (
              <div key={section.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Layers3 className="size-3 text-cyan-300" />
                  {section.title}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {section.lines.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-cyan-300" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
              <WandSparkles className="size-4" />
              Tailor for job
            </Button>
            <Button variant="outline" className="rounded-full border-white/10 bg-white/[0.03]">
              <Download className="size-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export { ResumeBuilder }