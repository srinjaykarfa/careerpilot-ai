import { cn } from "@/lib/utils"

type SuggestionChipsProps = {
  suggestions: string[]
  onSelect: (value: string) => void
  disabled?: boolean
}

function SuggestionChips({ suggestions, onSelect, disabled }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          disabled={disabled}
          className={cn(
            "rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-foreground/90 dark:border-white/10 dark:bg-white/[0.05]",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export { SuggestionChips }
