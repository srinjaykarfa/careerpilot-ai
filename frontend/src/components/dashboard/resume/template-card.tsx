"use client"

import { motion } from "framer-motion"
import { Check, Layers3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ResumeTemplate } from "./types"

type TemplateCardProps = {
  template: ResumeTemplate
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all hover:border-cyan-400/35",
        template.selected && "border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.12)]",
      )}
    >
      <div className={cn("relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br", template.previewGradient)}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_28%,transparent_72%,rgba(255,255,255,0.12))]" />
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <div className="space-y-1 text-white">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] backdrop-blur">
              <Layers3 className="size-3" />
              Resume preview
            </div>
            <p className="text-lg font-semibold drop-shadow">{template.name}</p>
          </div>
          {template.selected ? (
            <div className="flex size-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur">
              <Check className="size-4" />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{template.name}</p>
          <p className="text-xs text-muted-foreground">
            {template.selected ? "Currently selected" : "Available for use"}
          </p>
        </div>
        <Button
          variant={template.selected ? "secondary" : "outline"}
          className={cn(
            "rounded-full",
            !template.selected && "border-white/10 bg-white/[0.03]",
          )}
        >
          {template.selected ? "Selected" : "Use template"}
        </Button>
      </div>
    </motion.article>
  )
}

export { TemplateCard }