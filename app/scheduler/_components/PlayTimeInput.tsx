"use client";

import { useState, ChangeEvent, useEffect } from "react";

interface PlayTimeInputProps {
  playTime: string;
  onPlayTimeChange: (time: string) => void;
}

export default function PlayTimeInput({
  playTime,
  onPlayTimeChange,
}: PlayTimeInputProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (playTime) {
      setValue(playTime);
    }
  }, [playTime]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, "");

    if (newValue.length > 1 && newValue[0] === "0") {
      newValue = newValue.slice(1);
    }

    setValue(newValue);
    onPlayTimeChange(newValue);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-950 dark:text-zinc-50 text-sm font-bold">
        재생 시간
      </p>
      <div className="h-12 px-4 flex flex-row bg-zinc-100 dark:bg-zinc-900 rounded-xl justify-between items-center">
        <input
          className="bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 w-full outline-none"
          placeholder="180"
          value={value}
          onChange={handleChange}
        />
        <p className="text-zinc-500 text-base">초</p>
      </div>
    </div>
  );
}
