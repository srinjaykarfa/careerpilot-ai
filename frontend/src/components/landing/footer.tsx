import Link from "next/link"

import { Container } from "@/components/shared/container"
import { navLinks } from "@/components/landing/data"

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-heading font-semibold">Career AI Platform</div>
          <p className="mt-2 text-xs text-muted-foreground">
            AI mentor for students, freshers, and career switchers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="hover:text-foreground">
            Log in
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
