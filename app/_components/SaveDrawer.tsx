"use client";

import { useSaveDrawer } from "@/app/_hooks/useSaveDrawer";

export default function SaveDrawer() {
  const { saveAction } = useSaveDrawer();

  return (
    <nav className="absolute bottom-16 left-0 right-0 h-20 bg-white dark:bg-black rounded-tl-2xl rounded-tr-2xl">
      <div className="max-w-md mx-auto h-full flex justify-center items-center px-5">
        <button
          onClick={() => saveAction?.()}
          disabled={!saveAction}
          className="w-full h-12 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 font-bold rounded-xl
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-opacity"
        >
          저장
        </button>
      </div>
    </nav>
  );
}
