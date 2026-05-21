import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Bot,
  Briefcase,
  Compass,
  FileText,
  GraduationCap,
  Link,
  LineChart,
  Map,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react"

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "AI Demo", href: "#ai-chat" },
  { label: "Roadmap", href: "#roadmap" },
]

export const stats = [
  { value: "120k+", label: "Students mentored" },
  { value: "3.2x", label: "Resume score lift" },
  { value: "94%", label: "Career clarity" },
]

export type Step = {
  title: string
  description: string
  icon: LucideIcon
}

export const steps: Step[] = [
  {
    title: "AI understands your background",
    description:
      "Share your goals, strengths, and interests so the AI can map your career DNA.",
    icon: Sparkles,
  },
  {
    title: "Skills and goals are analyzed",
    description:
      "We benchmark your profile against industry signals and top hiring trends.",
    icon: LineChart,
  },
  {
    title: "Profile and resume get upgraded",
    description:
      "ATS-safe rewrites, portfolio guidance, and LinkedIn optimization delivered fast.",
    icon: ShieldCheck,
  },
  {
    title: "Strategic roles are unlocked",
    description:
      "The AI matches you with roles, internships, and growth opportunities.",
    icon: Target,
  },
]

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    title: "AI Career Mentor",
    description:
      "Always-on mentor that answers, recommends, and keeps your goals in focus.",
    icon: Bot,
  },
  {
    title: "Resume Intelligence",
    description:
      "ATS scoring, keyword gaps, and rewrite suggestions in one smart console.",
    icon: FileText,
  },
  {
    title: "LinkedIn Optimizer",
    description:
      "Headline, about section, and portfolio upgrades tailored for recruiters.",
    icon: Link,
  },
  {
    title: "Smart Job Matching",
    description:
      "AI-curated roles aligned with your skills, future salary, and growth path.",
    icon: Target,
  },
  {
    title: "Career Roadmaps",
    description:
      "Step-by-step paths with milestones, projects, and learning resources.",
    icon: Map,
  },
  {
    title: "Job Tracker",
    description:
      "Track applications, interviews, and outcomes in a clean dashboard.",
    icon: BarChart3,
  },
]

export type Category = {
  title: string
  description: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    title: "Engineering Students",
    description: "Build roadmaps for software, data, and core engineering roles.",
    icon: GraduationCap,
  },
  {
    title: "Commerce Students",
    description: "Navigate finance, marketing, and business analytics pathways.",
    icon: Briefcase,
  },
  {
    title: "Arts Students",
    description: "Showcase creative portfolios and discover modern design roles.",
    icon: Sparkles,
  },
  {
    title: "Freshers",
    description: "Land your first role with structured guidance and daily nudges.",
    icon: Users,
  },
  {
    title: "Career Switchers",
    description: "Translate past experience into a clear, confident new direction.",
    icon: Compass,
  },
]

export const chatMessages = [
  {
    role: "user",
    text: "I am a second year student and want to move into product design.",
  },
  {
    role: "ai",
    text: "Great! I mapped a 12-week roadmap: UX fundamentals, case study, portfolio launch, and mock interviews.",
  },
  {
    role: "user",
    text: "Can you improve my resume for design roles?",
  },
  {
    role: "ai",
    text: "Done. I boosted ATS keywords, refined your summary, and highlighted your top projects.",
  },
]

export const roadmapSteps = [
  {
    title: "Foundation Skills",
    description: "Core skills, starter projects, and confidence building.",
    progress: 70,
    timeframe: "Weeks 1-4",
  },
  {
    title: "Profile Upgrade",
    description: "Resume, LinkedIn, and portfolio polish with AI feedback.",
    progress: 45,
    timeframe: "Weeks 5-8",
  },
  {
    title: "Interview Sprint",
    description: "Mock interviews, storytelling, and offer strategy.",
    progress: 20,
    timeframe: "Weeks 9-12",
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Starter AI mentor and roadmap preview.",
    features: [
      "AI mentor chat (limited)",
      "Roadmap preview",
      "Basic resume scan",
    ],
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "Full AI mentor, resume intelligence, and job tracking.",
    features: [
      "Unlimited mentor chat",
      "ATS resume analysis",
      "LinkedIn optimization",
      "Smart job matching",
      "Job tracker dashboard",
    ],
    highlighted: true,
  },
  {
    name: "Career+",
    price: "$29/mo",
    description: "Premium mentorship with interview prep and growth insights.",
    features: [
      "Everything in Pro",
      "Mock interviews",
      "Hiring manager insights",
      "Portfolio review",
    ],
  },
]

export const trustHighlights = [
  {
    label: "AI mentor sessions",
    value: "2.4M",
    icon: MessageSquare,
  },
  {
    label: "Students from top colleges",
    value: "900+",
    icon: GraduationCap,
  },
  {
    label: "Career switches guided",
    value: "38k",
    icon: Zap,
  },
]
