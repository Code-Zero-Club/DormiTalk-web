"use client";

import { useState, useEffect } from "react";
import WeekButton from "./WeekButton";

interface PlayWeekSelectorProps {
  dayOfWeek: string[];
}

export default function PlayWeekSelector({ dayOfWeek }: PlayWeekSelectorProps) {
  const [activeWeeks, setActiveWeeks] = useState<string[]>(dayOfWeek);

  useEffect(() => {
    setActiveWeeks(dayOfWeek);
  }, [dayOfWeek]);

  const toggleWeek = (week: string) => {
    setActiveWeeks((prev) => {
      if (prev.includes(week)) {
        return prev.filter((day) => day !== week);
      } else {
        return [...prev, week];
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-950 dark:text-zinc-50 text-sm font-bold">
        재생 요일
      </p>
      <div className="w-full flex flex-row justify-between items-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((week) => (
          <WeekButton
            key={week}
            week={week}
            isActive={activeWeeks.includes(week)}
            onClick={() => toggleWeek(week)}
          />
        ))}
      </div>
    </div>
  );
}
