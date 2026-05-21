"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Lock, Mail, Sparkles, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "../hooks/use-auth"
import { getGoogleAuthUrl } from "../api/auth.api"

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

function SignupForm() {
  const router = useRouter()
  const signup = useAuth((state) => state.signup)
  const setAuth = useAuth((state) => state.setAuth)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  })

  const onSubmit = async (values: SignupFormValues) => {
    form.clearErrors("root")
    try {
      await signup(values)
      router.push("/onboarding")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create account."
      form.setError("root", { message })
    }
  }

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true)
    const authUrl = getGoogleAuthUrl()

    const width = 520
    const height = 620
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2.5

    const popup = window.open(
      authUrl,
      "google-auth",
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      window.location.href = authUrl
      return
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== "google-auth") return

      setAuth(event.data.payload)
      setIsGoogleLoading(false)
      window.removeEventListener("message", handleMessage)
      router.push("/onboarding")
    }

    window.addEventListener("message", handleMessage)

    const timer = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(timer)
        window.removeEventListener("message", handleMessage)
        setIsGoogleLoading(false)
      }
    }, 500)
  }

  const {
    formState: { errors, isSubmitting },
  } = form

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/25 via-emerald-500/10 to-transparent blur-2xl" />
      <Card className="relative border-border/60 bg-card/80 shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3 text-emerald-400" />
            Start your journey
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Get instant access to your AI career mentor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {errors.root?.message ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </div>
          ) : null}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full rounded-full"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignUp}
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-white text-black">
                  <svg
                    viewBox="0 0 48 48"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.13 0 5.94 1.08 8.15 3.2l6.08-6.08C34.61 2.77 29.66 1 24 1 14.62 1 6.58 6.38 2.7 14.36l7.1 5.51C11.65 13.5 17.4 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.2 24.5c0-1.7-.15-2.96-.48-4.26H24v8.07h12.58c-.26 2.05-1.67 5.14-4.8 7.2l7.38 5.74c4.28-3.95 6.94-9.77 6.94-16.75z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M9.8 28.1a14.6 14.6 0 0 1-.77-4.6c0-1.6.27-3.14.75-4.6l-7.1-5.5A23.9 23.9 0 0 0 0 23.5c0 3.86.93 7.5 2.68 10.8l7.12-5.2z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 46c6.5 0 11.94-2.14 15.92-5.8l-7.38-5.74c-2.04 1.42-4.77 2.39-8.54 2.39-6.6 0-12.35-4-14.2-9.86l-7.12 5.2C6.6 41.7 14.62 46 24 46z"
                    />
                  </svg>
                </span>
                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
              </span>
            </Button>
            <div className="relative flex items-center justify-center">
              <div className="h-px w-full bg-border/60" />
              <span className="absolute bg-card px-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                or
              </span>
            </div>
          </div>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  className="pl-9"
                  aria-invalid={Boolean(errors.name)}
                  {...form.register("name")}
                />
              </div>
              {errors.name?.message ? (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              ) : null}
            </div>
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
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Password
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
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { SignupForm }
