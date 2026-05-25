"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"

import { UploadResumeModal } from "./upload-resume-modal"

function EmptyState() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_40%)]" />
      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <div className="flex size-24 items-center justify-center rounded-[30px] border border-white/10 bg-black/30 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
          <FileText className="size-10 text-cyan-300" />
        </div>
        <h3 className="mt-6 text-2xl font-heading font-semibold text-foreground">No resumes yet</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Create your first AI-powered resume to unlock ATS analysis, template switching, and tailored job matching.
        </p>
        <div className="mt-8">
          <UploadResumeModal triggerLabel="Create Your First Resume" />
        </div>
      </div>
    </motion.section>
  )
}

export { EmptyState }