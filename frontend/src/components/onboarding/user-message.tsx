import { cn } from "@/lib/utils"

type UserMessageProps = {
  content: string
  className?: string
}

function UserMessage({ content, className }: UserMessageProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[85%] rounded-3xl bg-foreground px-4 py-3 text-sm text-background shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
        <p className="leading-relaxed text-background">{content}</p>
      </div>
    </div>
  )
}

export { UserMessage }
