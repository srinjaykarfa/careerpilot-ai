"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Container } from "@/components/shared/container"
import { Navbar } from "@/components/landing/navbar"
import { useAuth } from "@/features/auth/hooks/use-auth"

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setAuth = useAuth((state) => state.setAuth)

  useEffect(() => {
    const token = searchParams.get("token")
    const encodedUser = searchParams.get("user")

    if (!token || !encodedUser) {
      router.replace("/login")
      return
    }

    try {
      const userJson = atob(encodedUser)
      const user = JSON.parse(userJson)
      const payload = { token, user }

      if (window.opener) {
        window.opener.postMessage(
          { type: "google-auth", payload },
          window.location.origin,
        )
        window.close()
        return
      }

      setAuth(payload)
      router.replace("/dashboard")
    } catch {
      router.replace("/login")
    }
  }, [router, searchParams, setAuth])

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]" />
      <Navbar />
      <main className="flex flex-1 items-center">
        <Container className="flex w-full items-center justify-center py-16 text-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Connecting your Google account
            </p>
            <h1 className="text-2xl font-heading font-semibold">
              Finalizing your sign in...
            </h1>
            <p className="text-sm text-muted-foreground">
              Hang tight. Redirecting you to your dashboard.
            </p>
          </div>
        </Container>
      </main>
    </div>
  )
}
