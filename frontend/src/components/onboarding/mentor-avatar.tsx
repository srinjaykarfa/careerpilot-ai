import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type MentorAvatarProps = {
  className?: string
}

function MentorAvatar({ className }: MentorAvatarProps) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/25 via-sky-500/10 to-transparent text-cyan-300 shadow-[0_12px_30px_rgba(8,145,178,0.2)] dark:shadow-[0_16px_40px_rgba(8,145,178,0.35)]",
        className,
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-xl bg-background/70 text-cyan-400 shadow-sm dark:bg-black/40">
        <Sparkles className="size-3.5" />
      </span>
    </div>
  )
}

export { MentorAvatar }
