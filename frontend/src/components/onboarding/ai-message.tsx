import { MentorAvatar } from "@/components/onboarding/mentor-avatar"
import { cn } from "@/lib/utils"

type AiMessageProps = {
  content: string
  className?: string
}

function AiMessage({ content, className }: AiMessageProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <MentorAvatar />
      <div className="flex-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Career AI mentor
        </p>
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-white/80 via-white/70 to-white/40 px-4 py-4 text-sm text-foreground shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:from-white/[0.08] dark:via-white/[0.05] dark:to-white/[0.02] dark:text-white dark:shadow-[0_25px_60px_rgba(2,8,23,0.45)]">
          <p className="leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

export { AiMessage }
