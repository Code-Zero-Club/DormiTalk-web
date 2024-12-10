"use client";

import { useState, useEffect, useCallback } from "react";
import StartTimeSelector from "../_components/StartTimeSelector";
import Options from "../_components/Options";
import { SchedulerService } from "@/app/services/scheduler.service";
import { Scheduler } from "@/app/types/api";
import { useSaveDrawer } from "@/app/_hooks/useSaveDrawer";
import toast from "react-hot-toast";
import SchedulerSkeleton from "../_components/SchedulerSkeleton";
import SchedulerError from "../_components/SchedulerError";

export default function SchedulerContentView() {
  const [scheduler, setScheduler] = useState<Scheduler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hours, setHours] = useState("8");
  const [minutes, setMinutes] = useState("00");
  const [isAM, setIsAM] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [playTime, setPlayTime] = useState("180");

  const { setSaveAction } = useSaveDrawer();

  const fetchScheduler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SchedulerService.getAll();
      setScheduler(response.data);

      if (response.data.length > 0) {
        setSelectedDays(response.data[0].day_of_week);
        setPlayTime(response.data[0].play_time);

        const timeMatch =
          response.data[0].start_time.match(/(\d{1,2}):(\d{2})/);
        if (timeMatch) {
          let hour = parseInt(timeMatch[1]);
          setIsAM(hour < 12);
          if (hour > 12) hour -= 12;
          if (hour === 0) hour = 12;
          setHours(hour.toString());
          setMinutes(timeMatch[2]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch scheduler:", error);
      setError("스케줄러 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = useCallback(async () => {
    if (!scheduler.length) return;

    try {
      let hour = parseInt(hours);
      if (!isAM && hour !== 12) hour += 12;
      if (isAM && hour === 12) hour = 0;
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes}:00`;

      const updateData = {
        start_time: formattedTime,
        day_of_week: selectedDays,
        play_time: playTime,
      };

      await SchedulerService.update(scheduler[0].id, updateData);
      toast.success("성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("Failed to update scheduler:", error);
      toast.error("저장에 실패했습니다. 다시 시도해 주세요.");
    }
  }, [hours, minutes, isAM, selectedDays, playTime, scheduler]);

  useEffect(() => {
    setSaveAction(handleSave);
    return () => setSaveAction(null);
  }, [handleSave, setSaveAction]);

  useEffect(() => {
    fetchScheduler();
  }, []);

  if (error) {
    return <SchedulerError message={error} onRetry={fetchScheduler} />;
  }

  if (isLoading) {
    return <SchedulerSkeleton />;
  }

  return (
    <main className="h-full flex flex-col items-center">
      <StartTimeSelector
        hours={hours}
        minutes={minutes}
        isAM={isAM}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onAMPMChange={setIsAM}
      />
      <Options
        dayOfWeek={selectedDays}
        playTime={playTime}
        onDayOfWeekChange={setSelectedDays}
        onPlayTimeChange={setPlayTime}
      />
    </main>
  );
}
