export default function PlayWeekSelector() {
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-950 dark:text-zinc-50 text-sm font-bold">
        재생 요일
      </p>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-red-500 text-base font-medium">일</p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            월
          </p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            화
          </p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            수
          </p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            목
          </p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            금
          </p>
        </div>
        <div className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center cursor-pointer">
          <p className="text-blue-500 text-base font-medium">토</p>
        </div>
      </div>
    </div>
  );
}
