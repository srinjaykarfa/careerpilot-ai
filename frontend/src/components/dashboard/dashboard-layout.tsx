"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { useAuth } from "@/features/auth/hooks/use-auth"

type DashboardLayoutProps = {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [hydrated, setHydrated] = useState(false)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [hydrated, isAuthenticated, router])

  const displayName = useMemo(
    () => user?.name ?? user?.email ?? "there",
    [user?.email, user?.name],
  )

  if (!hydrated || !isAuthenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.16),_transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.25),_transparent_65%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar activePath={pathname} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title="Dashboard"
            activePath={pathname}
            userName={displayName}
            userEmail={user?.email}
            onLogout={() => {
              logout()
              router.replace("/login")
            }}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export { DashboardLayout }
