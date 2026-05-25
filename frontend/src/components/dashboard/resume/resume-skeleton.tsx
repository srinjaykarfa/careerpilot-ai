import { Skeleton } from "@/components/ui/skeleton"

function ResumeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-[28px] bg-white/5" />
        <Skeleton className="h-64 rounded-[28px] bg-white/5" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-40 rounded-full bg-white/5" />
          <Skeleton className="h-9 w-28 rounded-full bg-white/5" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[280px] rounded-[28px] bg-white/5" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-36 rounded-full bg-white/5" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-[24px] bg-white/5" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-48 rounded-full bg-white/5" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-72 rounded-[28px] bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  )
}

export { ResumeSkeleton }