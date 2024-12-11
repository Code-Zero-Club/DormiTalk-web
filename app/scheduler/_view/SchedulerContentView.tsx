"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import StartTimeSelector from "../_components/StartTimeSelector";
import Options from "../_components/Options";
import SchedulerSkeleton from "../_components/SchedulerSkeleton";
import SchedulerError from "../_components/SchedulerError";
import { SchedulerService } from "@/app/services/scheduler.service";
import { Scheduler } from "@/app/types/api";
import { useSaveDrawer } from "@/app/_hooks/useSaveDrawer";

interface SchedulerState {
  hours: string;
  minutes: string;
  isAM: boolean;
  selectedDays: string[];
  playTime: string;
}

export default function SchedulerContentView() {
  const [scheduler, setScheduler] = useState<Scheduler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hours, setHours] = useState("8");
  const [minutes, setMinutes] = useState("00");
  const [isAM, setIsAM] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [playTime, setPlayTime] = useState("180");

  const [initialState, setInitialState] = useState<SchedulerState | null>(null);

  const { setSaveAction } = useSaveDrawer();

  const arrayEquals = (a: string[], b: string[]) => {
    return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
  };

  const hasChanges = useCallback(() => {
    if (!initialState) return false;

    return (
      initialState.hours !== hours ||
      initialState.minutes !== minutes ||
      initialState.isAM !== isAM ||
      !arrayEquals(initialState.selectedDays, selectedDays) ||
      initialState.playTime !== playTime
    );
  }, [hours, minutes, isAM, selectedDays, playTime, initialState]);

  const handleSave = useCallback(async () => {
    if (!scheduler.length || !hasChanges()) return;

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

      setInitialState({
        hours,
        minutes,
        isAM,
        selectedDays: [...selectedDays],
        playTime,
      });
    } catch (error) {
      console.error("Failed to update scheduler:", error);
      toast.error("저장에 실패했습니다. 다시 시도해 주세요.");
    }
  }, [hours, minutes, isAM, selectedDays, playTime, scheduler, hasChanges]);

  const fetchScheduler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SchedulerService.getAll();
      setScheduler(response.data);

      if (response.data.length > 0) {
        const timeMatch =
          response.data[0].start_time.match(/(\d{1,2}):(\d{2})/);
        let newHours = "8";
        let newMinutes = "00";
        let newIsAM = true;

        if (timeMatch) {
          let hour = parseInt(timeMatch[1]);
          newIsAM = hour < 12;
          if (hour > 12) hour -= 12;
          if (hour === 0) hour = 12;
          newHours = hour.toString();
          newMinutes = timeMatch[2];
        }

        setHours(newHours);
        setMinutes(newMinutes);
        setIsAM(newIsAM);
        setSelectedDays(response.data[0].day_of_week);
        setPlayTime(response.data[0].play_time);

        setInitialState({
          hours: newHours,
          minutes: newMinutes,
          isAM: newIsAM,
          selectedDays: [...response.data[0].day_of_week],
          playTime: response.data[0].play_time,
        });
      }
    } catch (error) {
      console.error("Failed to fetch scheduler:", error);
      setError("스케줄러 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScheduler();
  }, [fetchScheduler]);

  useEffect(() => {
    setSaveAction(hasChanges() ? handleSave : null);
    return () => setSaveAction(null);
  }, [handleSave, setSaveAction, hasChanges]);
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
