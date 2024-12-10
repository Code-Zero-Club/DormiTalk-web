interface WeekButtonProps {
  week: string;
  isActive: boolean;
  onClick: () => void;
}

export default function WeekButton({
  week,
  isActive,
  onClick,
}: WeekButtonProps) {
  if (week === "일") {
    return (
      <button
        onClick={onClick}
        className={`size-9 flex rounded-full justify-center items-center
        ${
          isActive
            ? "bg-zinc-900 dark:bg-zinc-100"
            : "bg-zinc-100 dark:bg-zinc-900"
        }`}
      >
        <p className="text-red-500 text-base font-medium">{week}</p>
      </button>
    );
  }

  if (week === "토") {
    return (
      <button
        onClick={onClick}
        className={`size-9 flex rounded-full justify-center items-center
        ${
          isActive
            ? "bg-zinc-900 dark:bg-zinc-100"
            : "bg-zinc-100 dark:bg-zinc-900"
        }`}
      >
        <p className="text-blue-500 text-base font-medium">{week}</p>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`size-9 flex rounded-full justify-center items-center
        ${
          isActive
            ? "bg-zinc-900 dark:bg-zinc-100"
            : "bg-zinc-100 dark:bg-zinc-900"
        }`}
    >
      <p
        className={`text-base font-medium ${
          isActive
            ? "text-zinc-100 dark:text-zinc-900"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {week}
      </p>
    </button>
  );
}
