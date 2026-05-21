"use client"

import { useState } from "react"
import { LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { SidebarContent } from "@/components/dashboard/sidebar"

type TopbarProps = {
  title: string
  activePath: string
  userName: string
  userEmail?: string | null
  onLogout: () => void
}

function Topbar({ title, activePath, userName, userEmail, onLogout }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/95 p-5">
              <SidebarContent
                activePath={activePath}
                onNavigate={() => setIsOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Workspace
            </p>
            <h1 className="text-lg font-heading font-semibold text-foreground sm:text-xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/70 px-2.5 py-1 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:flex">
            <Avatar size="sm">
              <AvatarFallback>{initials || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="max-w-[140px] truncate text-sm font-medium">
                {userName}
              </span>
              {userEmail ? (
                <span className="max-w-[140px] truncate text-[0.7rem] text-muted-foreground">
                  {userEmail}
                </span>
              ) : null}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-3"
            onClick={onLogout}
          >
            <LogOut className="size-3" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Topbar }
