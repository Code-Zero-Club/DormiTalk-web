export default function PlayTimeInput() {
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-950 dark:text-zinc-50 text-sm font-bold">
        재생 시간
      </p>
      <div className="h-12 px-4 flex flex-row bg-zinc-100 dark:bg-zinc-900 rounded-xl justify-between items-center">
        <input
          className="bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-900 dark:placeholder:text-zinc-100"
          placeholder="180"
        />
        <p className="text-zinc-500 text-base">초</p>
      </div>
    </div>
  );
}
