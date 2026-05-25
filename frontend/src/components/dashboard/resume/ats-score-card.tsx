"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type ATSScoreCardProps = {
  score: number
  label?: string
  compact?: boolean
}

function getTone(score: number) {
  if (score >= 80) {
    return {
      ring: "from-emerald-400 via-cyan-400 to-blue-500",
      glow: "shadow-emerald-400/20",
      text: "text-emerald-300",
    }
  }

  if (score >= 60) {
    return {
      ring: "from-amber-300 via-yellow-400 to-orange-400",
      glow: "shadow-amber-400/20",
      text: "text-amber-300",
    }
  }

  return {
    ring: "from-rose-500 via-red-500 to-orange-500",
    glow: "shadow-rose-500/20",
    text: "text-rose-300",
  }
}

function ATSScoreCard({ score, label = "ATS Score", compact = false }: ATSScoreCardProps) {
  const tone = getTone(score)
  const progress = Math.min(100, Math.max(0, score))
  const bars = Array.from({ length: 5 }, (_, index) => {
    const value = Math.min(100, progress - index * 12)

    return {
      height: `${Math.max(24, value)}%`,
      active: value > 18,
    }
  })

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl",
        tone.glow,
        compact && "p-3",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.14),_transparent_40%)]" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3 text-cyan-300" />
            {label}
          </div>
          <div className="flex items-end gap-3">
            <div className="relative size-24 shrink-0 rounded-full bg-[#050816] p-2 shadow-[0_0_35px_rgba(56,189,248,0.25)]">
              <div
                className={cn(
                  "absolute inset-2 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))]",
                  tone.ring,
                )}
                style={{
                  background: `conic-gradient(from 0deg, rgba(255,255,255,0.08) 0deg, rgba(255,255,255,0.08) ${100 - progress}%, rgba(59,130,246,0.95) ${100 - progress}% 100%)`,
                }}
              />
              <div className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full bg-[#050816] text-center">
                <span className={cn("text-2xl font-semibold", tone.text)}>
                  {score}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  /100
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Optimization signal</p>
              <div className="flex items-end gap-1.5">
                {bars.map((bar, index) => (
                  <motion.span
                    key={`${index}-${score}`}
                    initial={{ height: 0, opacity: 0.2 }}
                    animate={{ height: bar.height, opacity: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className={cn(
                      "w-2 rounded-full",
                      bar.active ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "bg-white/10",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {!compact ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              AI verdict
            </p>
            <p className={cn("mt-1 text-sm font-medium", tone.text)}>
              {score >= 80 ? "Highly competitive" : score >= 60 ? "Needs a pass" : "Low signal"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { ATSScoreCard }