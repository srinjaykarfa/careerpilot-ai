"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { CloudUpload, FileText, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type UploadResumeModalProps = {
  triggerLabel?: string
}

function UploadResumeModal({ triggerLabel = "Upload resume" }: UploadResumeModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_20px_40px_rgba(14,165,233,0.25)] hover:from-cyan-400 hover:to-violet-500">
          <CloudUpload className="size-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-border/60 bg-[#050816]/95 text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Upload & Analyze Resume</DialogTitle>
          <DialogDescription>
            Support PDF and DOCX files. Drop a resume below to generate ATS intelligence and optimization suggestions.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            const file = event.dataTransfer.files?.[0]
            if (file) {
              setFileName(file.name)
            }
          }}
          whileHover={{ scale: 1.01 }}
          className={
            `group relative flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed px-6 py-8 text-center transition-all ` +
            (isDragging
              ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]"
              : "border-white/10 bg-white/[0.03]")
          }
          onClick={() => inputRef.current?.click()}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_40%)]" />
          <div className="relative space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              <FileText className="size-7 text-cyan-300" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Drop resume here</p>
              <p className="text-sm text-muted-foreground">
                Drag and drop a file or click to browse. AI will extract structure, keywords, and ATS readiness.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-white/10 px-3 py-1">PDF</span>
              <span className="rounded-full border border-white/10 px-3 py-1">DOCX</span>
              <span className="rounded-full border border-white/10 px-3 py-1">ATS scan</span>
            </div>
            {fileName ? (
              <p className="text-sm text-emerald-300">Selected file: {fileName}</p>
            ) : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                setFileName(file.name)
              }
            }}
          />
        </motion.div>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-cyan-300" />
            <span>Instant ATS preview and section-level feedback</span>
          </div>
          <Button className="rounded-full bg-white text-black hover:bg-white/90">
            Analyze now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { UploadResumeModal }