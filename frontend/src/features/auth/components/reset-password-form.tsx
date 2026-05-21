"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { resetPassword } from "../api/auth.api"

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type ResetFormValues = z.infer<typeof resetSchema>

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams])
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  })

  useEffect(() => {
    if (!token) {
      form.setError("root", { message: "Reset token is missing." })
    }
  }, [form, token])

  const onSubmit = async (values: ResetFormValues) => {
    if (!token) return
    form.clearErrors("root")
    setServerMessage(null)

    try {
      const response = await resetPassword({
        token,
        password: values.password,
      })
      setServerMessage(response.message)
      form.reset()
      window.setTimeout(() => router.replace("/login"), 1200)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to reset password."
      form.setError("root", { message })
    }
  }

  const {
    formState: { errors, isSubmitting },
  } = form

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent blur-2xl" />
      <Card className="relative border-border/60 bg-card/80 shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3 text-cyan-400" />
            Password reset
          </div>
          <CardTitle className="text-2xl">Set a new password</CardTitle>
          <CardDescription>
            Choose a strong password to secure your account.
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
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  className="pl-9"
                  aria-invalid={Boolean(errors.password)}
                  {...form.register("password")}
                />
              </div>
              {errors.password?.message ? (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className="pl-9"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...form.register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword?.message ? (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? "Updating password..." : "Update password"}
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            Need a new link?{" "}
            <Link href="/forgot-password" className="text-foreground hover:underline">
              Resend reset email
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { ResetPasswordForm }
