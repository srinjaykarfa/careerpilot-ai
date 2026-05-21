"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type OnboardingInputProps = {
  disabled?: boolean
  onSend: (message: string) => void
}

function OnboardingInput({ disabled, onSend }: OnboardingInputProps) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }

  return (
    <div className="relative rounded-3xl border border-border/60 bg-card/80 p-4 shadow-[0_20px_45px_rgba(2,8,23,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Share your answer..."
        className="min-h-16 resize-none border-none bg-transparent pr-16 text-sm leading-relaxed focus-visible:ring-0"
        disabled={disabled}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSend()
          }
        }}
      />
      <Button
        size="icon-lg"
        className="absolute bottom-3 right-3 rounded-full"
        onClick={handleSend}
        disabled={disabled || value.trim().length === 0}
      >
        <Send className="size-4" />
      </Button>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Enter to send, Shift+Enter for a new line</span>
        {disabled ? <span>Waiting for AI...</span> : null}
      </div>
    </div>
  )
}

export { OnboardingInput }
