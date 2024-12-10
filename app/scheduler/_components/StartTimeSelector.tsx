import { ChangeEvent, useState } from "react";

interface StartTimeSelectorProps {
  hours: string;
  minutes: string;
  isAM: boolean;
  onHoursChange: (hours: string) => void;
  onMinutesChange: (minutes: string) => void;
  onAMPMChange: (isAM: boolean) => void;
}

export default function StartTimeSelector({
  hours,
  minutes,
  isAM,
  onHoursChange,
  onMinutesChange,
  onAMPMChange,
}: StartTimeSelectorProps) {
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [isEditingMinutes, setIsEditingMinutes] = useState(false);

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(value);

    if (value === "") {
      onHoursChange("");
      return;
    }

    if (numValue >= 0 && numValue <= 12) {
      onHoursChange(numValue.toString());
    }
  };

  const handleHoursBlur = () => {
    setIsEditingHours(false);
    if (hours === "") {
      onHoursChange("8");
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(value);

    if (value === "") {
      onMinutesChange("");
      return;
    }

    if (numValue >= 0 && numValue < 60) {
      onMinutesChange(numValue.toString().padStart(2, "0"));
    }
  };

  const handleMinutesBlur = () => {
    setIsEditingMinutes(false);
    if (minutes === "") {
      onMinutesChange("00");
    }
  };

  return (
    <div className="flex flex-row w-full h-40 bg-zinc-100 dark:bg-zinc-900 justify-center items-center gap-9">
      <p
        className="logo-font text-zinc-950 dark:text-zinc-50 text-4xl cursor-pointer hover:opacity-80"
        onClick={() => onAMPMChange(!isAM)}
      >
        {isAM ? "오전" : "오후"}
      </p>
      <div className="flex flex-row logo-font text-zinc-950 dark:text-zinc-50 text-4xl gap-6">
        {isEditingHours ? (
          <input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            onBlur={handleHoursBlur}
            className="w-12 bg-transparent text-center logo-font text-4xl outline-none"
            autoFocus
          />
        ) : (
          <p
            onClick={() => setIsEditingHours(true)}
            className="cursor-pointer hover:opacity-80"
          >
            {hours}
          </p>
        )}
        <p>:</p>
        {isEditingMinutes ? (
          <input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            onBlur={handleMinutesBlur}
            className="w-12 bg-transparent text-center logo-font text-4xl outline-none"
            autoFocus
          />
        ) : (
          <p
            onClick={() => setIsEditingMinutes(true)}
            className="cursor-pointer hover:opacity-80"
          >
            {minutes}
          </p>
        )}
      </div>
    </div>
  );
}
