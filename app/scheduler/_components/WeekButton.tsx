interface WeekButtonProps {
  week: string;
  style: string;
}

export default function WeekButton({ week, style }: WeekButtonProps) {
  return (
    <button className="size-9 flex bg-zinc-100 dark:bg-zinc-900 rounded-full justify-center items-center">
      <p className={`${style} text-base font-medium`}>{week}</p>
    </button>
  );
}
