import { ChatDemo } from "@/components/landing/chat-demo"
import { Features } from "@/components/landing/features"
import { FinalCta } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { RoadmapPreview } from "@/components/landing/roadmap-preview"
import { StudentCategories } from "@/components/landing/student-categories"
import { Trust } from "@/components/landing/trust"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Trust />
        <HowItWorks />
        <Features />
        <ChatDemo />
        <StudentCategories />
        <RoadmapPreview />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
