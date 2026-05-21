import { cn } from "@/lib/utils"

type ChatMessageProps = {
  role: "assistant" | "user"
  content: string
  className?: string
}

function ChatMessage({ role, content, className }: ChatMessageProps) {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm shadow-sm",
        isAssistant
          ? "border-border/60 bg-card/80 text-foreground dark:border-white/10 dark:bg-white/[0.04]"
          : "border-foreground/10 bg-foreground text-background",
        className,
      )}
    >
      <p className={cn(!isAssistant && "text-background")}>{content}</p>
    </div>
  )
}

export { ChatMessage }
