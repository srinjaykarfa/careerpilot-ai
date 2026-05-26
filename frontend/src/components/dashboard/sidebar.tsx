"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  ClipboardCheck,
  LayoutDashboard,
  Map,
  Settings,
  Sparkles,
  FileText,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type SidebarItem = {
  label: string
  href: string
  icon: LucideIcon
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Mentor", href: "/dashboard/mentor", icon: Sparkles },
  { label: "Roadmap", href: "/dashboard/roadmap", icon: Map },
  { label: "Resume", href: "/dashboard/resume", icon: FileText },
  { label: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { label: "Applications", href: "/dashboard/applications", icon: ClipboardCheck },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

type SidebarContentProps = {
  activePath: string
  onNavigate?: () => void
}

function SidebarContent({ activePath, onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-3 px-2">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-sm font-heading font-semibold">Career AI</p>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
      </div>

      <div className="flex-1">
        <p className="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Workspace
        </p>
        <nav className="mt-3 flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive =
              activePath === item.href ||
              activePath.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-foreground text-background shadow-sm shadow-black/10 dark:bg-white/90 dark:text-black"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg border border-transparent",
                    isActive
                      ? "bg-background/15 text-background dark:bg-black/10"
                      : "bg-muted/50 text-muted-foreground group-hover:bg-muted",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 px-3 py-3 text-xs text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        Your AI mentor workspace is ready.
      </div>
    </div>
  )
}

type SidebarProps = {
  activePath: string
}

function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-border/60 bg-background/80 p-5 backdrop-blur-xl dark:border-white/10 lg:flex">
      <SidebarContent activePath={activePath} />
    </aside>
  )
}

export { Sidebar, SidebarContent }
