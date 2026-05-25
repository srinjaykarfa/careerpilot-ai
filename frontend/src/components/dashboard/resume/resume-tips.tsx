"use client"

import { motion } from "framer-motion"
import { BrainCircuit, ScanSearch, Sparkles } from "lucide-react"

import type { ResumeTip } from "./types"

type ResumeTipsProps = {
  tips: ResumeTip[]
}

const iconMap = {
  spark: Sparkles,
  scan: ScanSearch,
  bolt: BrainCircuit,
} as const

function ResumeTips({ tips }: ResumeTipsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tips.map((tip, index) => {
        const Icon = iconMap[tip.icon as keyof typeof iconMap] ?? Sparkles

        return (
          <motion.article
            key={tip.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{tip.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{tip.description}</p>
          </motion.article>
        )
      })}
    </div>
  )
}

export { ResumeTips }