"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { forgotPassword } from "../api/auth.api"

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

function ForgotPasswordForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  })

  const onSubmit = async (values: ForgotFormValues) => {
    form.clearErrors("root")
    setServerMessage(null)

    try {
      const response = await forgotPassword(values)
      setServerMessage(response.message)
      form.reset({ email: "" })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send reset link."
      form.setError("root", { message })
    }
  }

  const {
    formState: { errors, isSubmitting },
  } = form

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-2xl" />
      <Card className="relative border-border/60 bg-card/80 shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3 text-amber-400" />
            Account recovery
          </div>
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email to receive a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {errors.root?.message ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </div>
          ) : null}
          {serverMessage ? (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
              {serverMessage}
            </div>
          ) : null}
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@domain.com"
                  autoComplete="email"
                  className="pl-9"
                  aria-invalid={Boolean(errors.email)}
                  {...form.register("email")}
                />
              </div>
              {errors.email?.message ? (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              ) : null}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending link..." : "Send reset link"}
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { ForgotPasswordForm }
