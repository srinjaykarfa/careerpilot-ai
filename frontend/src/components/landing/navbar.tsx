"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Menu, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Container } from "@/components/shared/container"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { navLinks } from "@/components/landing/data"
import { useAuth } from "@/features/auth/hooks/use-auth"

function Navbar() {
  const router = useRouter()
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)

  const displayName = user?.name ?? user?.email ?? "Account"
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50">
      <Container className="flex h-12 items-center justify-between rounded-2xl border border-black/5 bg-white/70 px-4 shadow-sm shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/30 dark:shadow-black/40 sm:h-14 sm:px-6">
        <Link href="#top" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background">
            <Sparkles className="size-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-heading font-semibold">Career AI</span>
            <span className="text-xs text-muted-foreground">Platform</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <Avatar size="sm">
                  <AvatarFallback>{initials || "U"}</AvatarFallback>
                </Avatar>
                <span className="max-w-[160px] truncate text-sm font-medium">
                  {displayName}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4"
                onClick={handleLogout}
              >
                <LogOut className="size-3" />
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" className="text-sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="rounded-full px-5" asChild>
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background">
                  <Sparkles className="size-4" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-heading font-semibold">
                    Career AI
                  </span>
                  <span className="text-xs text-muted-foreground">Platform</span>
                </div>
              </div>
              <nav className="mt-8 flex flex-col gap-4 text-sm text-muted-foreground">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link href={link.href} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              {isAuthenticated ? (
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                    <Avatar size="sm">
                      <AvatarFallback>{initials || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{displayName}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="size-3" />
                      Log out
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <div className="mt-8 flex flex-col gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}

export { Navbar }
