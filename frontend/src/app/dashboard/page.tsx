"use client"

import { useMemo } from "react"

import { useAuth } from "@/features/auth/hooks/use-auth"

export default function DashboardPage() {
  const user = useAuth((state) => state.user)
  const displayName = useMemo(
    () => user?.name ?? user?.email ?? "there",
    [user?.email, user?.name],
  )

  return (
    <div className="py-6">
      <h1 className="text-2xl font-heading font-semibold sm:text-3xl">
        Welcome back, {displayName} 👋
      </h1>
    </div>
  )
}
