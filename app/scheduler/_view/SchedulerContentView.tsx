"use client";

import { useState, useEffect } from "react";
import StartTimeSelector from "../_components/StartTimeSelector";
import Options from "../_components/Options";
import { SchedulerService } from "@/app/services/scheduler.service";
import { Scheduler } from "@/app/types/api";

export default function SchedulerContentView() {
  const [scheduler, setScheduler] = useState<Scheduler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScheduler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SchedulerService.getAll();
      setScheduler(response.data);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setError("스케줄러 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduler();
  }, []);

  if (error) {
    return <p>에러남</p>;
  }

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  return (
    <main className="h-full flex flex-col items-center">
      <StartTimeSelector />
      <Options
        dayOfWeek={scheduler[0].day_of_week}
        playTime={scheduler[0].play_time}
      />
    </main>
  );
}
