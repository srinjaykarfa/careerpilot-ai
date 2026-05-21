import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

import { Navbar } from "@/components/landing/navbar"
import { Container } from "@/components/shared/container"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]" />
      <Navbar />
      <main className="flex flex-1 items-center">
        <Container className="grid w-full items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              Back to home
            </Link>
            <h1 className="text-3xl font-heading font-semibold sm:text-4xl">
              Choose a new secure password.
            </h1>
            <p className="max-w-md text-sm text-muted-foreground sm:text-base">
              Update your credentials and get back to your AI roadmap.
            </p>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <Sparkles className="size-4 text-cyan-400" />
              <span>Use at least 6 characters for a strong password.</span>
            </div>
          </div>
          <ResetPasswordForm />
        </Container>
      </main>
    </div>
  )
}
