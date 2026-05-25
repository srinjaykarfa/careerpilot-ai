"use client"

import {
  ChevronDown,
  Download,
  Edit3,
  Eye,
  FileDown,
  Link2,
  Plus,
  RotateCcw,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ResumeBuilderPage() {
  return (
    <div className="space-y-5 pb-10">
      <header>
        <h1 className="text-2xl font-heading font-semibold text-foreground sm:text-3xl">
          Resume Builder
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a professional resume with live preview.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="rounded-full">
          <Edit3 className="size-3" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Eye className="size-3" />
          Preview
        </Button>
        <Button size="sm" className="rounded-full">
          <Download className="size-3" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          Login to Save
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <FileDown className="size-3" />
          Export JSON
        </Button>
        <Button variant="destructive" size="sm" className="rounded-full">
          <RotateCcw className="size-3" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Personal Details</CardTitle>
              <CardDescription>Contact Information</CardDescription>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
                <Input placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Email *</label>
                <Input type="email" placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Country</label>
                <select className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-foreground">
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <Input placeholder="+880" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <Input placeholder="City, State, Country" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Social Profiles & Links</p>
                <span className="text-xs text-muted-foreground">Platform / URL</span>
              </div>
              {["LinkedIn", "GitHub", "Portfolio"].map((platform) => (
                <div key={platform} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                  <Input placeholder={platform} />
                  <Input placeholder="https://" />
                  <Button variant="ghost" size="icon-sm" aria-label="Remove">
                    <RotateCcw className="size-3" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus className="size-3" />
                Add Profile Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Professional Summary</CardTitle>
              <CardDescription>Write a compelling summary with line breaks.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Preview</Button>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write a compelling professional summary. Use line breaks for formatting."
              className="min-h-32"
            />
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Skills</CardTitle>
              <CardDescription>Comma separated or add one by one.</CardDescription>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" className="rounded-full">Comma Separated</Button>
              <Button variant="outline" size="sm" className="rounded-full">Add One by One</Button>
            </div>
            <Textarea placeholder="Enter skills separated by commas" className="min-h-24" />
            <div className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
              0 skills added
            </div>
          </CardContent>
        </Card>

        {[
          { title: "Education", action: "Add Education" },
          { title: "Work Experience", action: "Add Experience" },
          { title: "Projects", action: "Add Project" },
          { title: "Certificates", action: "Add Certificate" },
        ].map((section) => (
          <Card key={section.title} className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">{section.title}</CardTitle>
              <ChevronDown className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus className="size-3" />
                {section.action}
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card className="border-border/60 bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">References (PDF)</CardTitle>
              <CardDescription>Upload PDF references.</CardDescription>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 px-6 py-8 text-center text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
              <Upload className="mx-auto size-6 text-muted-foreground" />
              <p className="mt-2 text-sm text-foreground">Click to upload or drag and drop</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF only, max 5MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}