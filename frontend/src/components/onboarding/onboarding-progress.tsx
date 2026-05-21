import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type OnboardingProgressProps = {
  stepLabel: string
  stepIndex: number
  totalSteps?: number
  progress?: number
}

function OnboardingProgress({
  stepLabel,
  stepIndex,
  totalSteps = 8,
  progress,
}: OnboardingProgressProps) {
  const percent =
    typeof progress === "number"
      ? Math.min(100, Math.max(0, progress))
      : Math.min(100, (stepIndex / totalSteps) * 100)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>Step {stepIndex} of {totalSteps}</span>
        <span className="text-foreground/70">{stepLabel}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400",
            progress === undefined && "animate-pulse",
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export { OnboardingProgress }
