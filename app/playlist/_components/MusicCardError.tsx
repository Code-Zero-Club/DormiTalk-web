import { InfoCircle, Refresh } from "iconsax-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function MusicCardError({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="w-full flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <InfoCircle className="size-12 text-red-500" />
        <p className="text-zinc-900 dark:text-zinc-100 font-medium">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          <Refresh className="size-4 text-zinc-950 dark:text-zinc-50" />
          <span className="text-zinc-950 dark:text-zinc-50">다시 시도</span>
        </button>
      </div>
    </div>
  );
}
