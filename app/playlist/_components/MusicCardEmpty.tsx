import { Music, Refresh } from "iconsax-react";

interface EmptyStateProps {
  onRefresh: () => void;
}

export default function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Music className="size-12 text-zinc-400" />
        <div className="space-y-1">
          <p className="text-zinc-900 dark:text-zinc-100 font-medium">
            음악이 없습니다
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            아직 추가된 음악이 없습니다. 음악을 추가해주세요.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          <Refresh className="size-4 text-zinc-950 dark:text-zinc-50" />
          <span className="text-zinc-950 dark:text-zinc-50">새로고침</span>
        </button>
      </div>
    </div>
  );
}
