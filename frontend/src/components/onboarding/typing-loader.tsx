type TypingLoaderProps = {
  label?: string
}

function TypingLoader({ label = "AI mentor is thinking..." }: TypingLoaderProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <span className="inline-flex size-1.5 animate-bounce rounded-full bg-muted-foreground" />
        <span className="inline-flex size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
        <span className="inline-flex size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
      </div>
      <span className="animate-pulse">{label}</span>
    </div>
  )
}

export { TypingLoader }
