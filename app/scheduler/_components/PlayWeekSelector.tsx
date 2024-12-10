import WeekButton from "./WeekButton";

interface PlayTimeInputProps {
  dayOfWeek: string[];
}

export default function PlayWeekSelector({ dayOfWeek }: PlayTimeInputProps) {
  console.log(dayOfWeek);
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-950 dark:text-zinc-50 text-sm font-bold">
        재생 요일
      </p>
      <div className="w-full flex flex-row justify-between items-center">
        <WeekButton week="일" style="text-red-500" />
        <WeekButton week="월" style="text-zinc-900 dark:text-zinc-100" />
        <WeekButton week="화" style="text-zinc-900 dark:text-zinc-100" />
        <WeekButton week="수" style="text-zinc-900 dark:text-zinc-100" />
        <WeekButton week="목" style="text-zinc-900 dark:text-zinc-100" />
        <WeekButton week="금" style="text-zinc-900 dark:text-zinc-100" />
        <WeekButton week="토" style="text-blue-500" />
      </div>
    </div>
  );
}
