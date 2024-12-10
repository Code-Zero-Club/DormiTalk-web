export default function MusicCardSkeleton() {
  return (
    <div className="flex flex-row items-center p-3 gap-3 animate-pulse">
      <div className="size-6 bg-zinc-200 dark:bg-zinc-700 rounded" />
      <div className="size-12 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4" />
      </div>
      <div className="size-6 bg-zinc-200 dark:bg-zinc-700 rounded" />
    </div>
  );
}
