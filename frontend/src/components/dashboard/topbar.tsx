"use client"

import { useState } from "react"
import { Bell, ChevronDown, LogOut, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { SidebarContent } from "@/components/dashboard/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type TopbarProps = {
  title: string
  subtitle?: string
  activePath: string
  userName: string
  userEmail?: string | null
  onLogout: () => void
}

function Topbar({
  title,
  subtitle,
  activePath,
  userName,
  userEmail,
  onLogout,
}: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
  const notificationItems = [
    {
      title: "Resume analysis complete",
      description: "Your latest ATS insights are ready to review.",
      tone: "success",
    },
    {
      title: "New job match found",
      description: "A senior product role matches your current resume.",
      tone: "info",
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <div className="flex flex-col gap-4 px-4 py-3 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
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

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Workspace
            </p>
            <h1 className="text-lg font-heading font-semibold text-foreground sm:text-xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="max-w-2xl text-xs text-muted-foreground sm:text-sm">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 xl:min-w-[42rem] xl:flex-row xl:items-center xl:justify-end">
          <div className="relative flex-1 xl:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resumes, templates, jobs"
              className="h-10 rounded-full border-border/60 bg-card/70 pl-9 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="relative rounded-full border-border/60 bg-card/70 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-[#0b1020]/95">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationItems.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="flex cursor-default items-start gap-3 rounded-xl px-3 py-3 focus:bg-muted"
                  >
                    <span
                      className={cn(
                        "mt-1 size-2 rounded-full",
                        item.tone === "success"
                          ? "bg-emerald-400"
                          : "bg-cyan-400",
                      )}
                    />
                    <span className="space-y-1">
                      <span className="block text-sm font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 gap-2 rounded-full border-border/60 bg-card/70 px-2.5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <Avatar size="sm">
                    <AvatarFallback>{initials || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start leading-tight sm:flex">
                    <span className="max-w-[120px] truncate text-sm font-medium">
                      {userName}
                    </span>
                    {userEmail ? (
                      <span className="max-w-[120px] truncate text-[0.7rem] text-muted-foreground">
                        {userEmail}
                      </span>
                    ) : null}
                  </div>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-[#0b1020]/95">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {userName}
                    </span>
                    {userEmail ? (
                      <span className="text-xs text-muted-foreground">
                        {userEmail}
                      </span>
                    ) : null}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={onLogout}
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Topbar }
