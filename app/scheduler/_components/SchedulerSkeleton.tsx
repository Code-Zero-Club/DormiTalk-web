export default function SchedulerSkeleton() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      {/* Time Selector Skeleton */}
      <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-900 flex justify-center items-center gap-9">
        <div className="h-12 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="flex gap-6">
          <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-12 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      {/* Options Skeleton */}
      <div className="w-full p-5 flex flex-col gap-6">
        {/* Week Selector Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="flex justify-between">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="size-9 bg-zinc-200 dark:bg-zinc-800 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Play Time Input Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
