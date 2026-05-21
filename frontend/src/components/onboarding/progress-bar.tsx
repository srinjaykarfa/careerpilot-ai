import { cn } from "@/lib/utils"

type ProgressBarProps = {
  value?: number
}

function ProgressBar({ value }: ProgressBarProps) {
  const width = value !== undefined ? `${value}%` : "35%"

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400",
          value === undefined && "animate-pulse",
        )}
        style={{ width }}
      />
    </div>
  )
}

export { ProgressBar }
