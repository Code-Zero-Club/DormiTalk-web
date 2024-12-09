"use client";

import SettingSection from "./SettingSection";
import Switch from "@/app/_components/common/Switch";
import { useEffect, useState } from "react";
import { useDarkMode } from "@/app/_hooks/useDarkMode";

export default function AdditionalSettings() {
  const [mounted, setMounted] = useState(false);
  const { isDark, setIsDark } = useDarkMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
    );
  }

  return (
    <SettingSection
      title="부가 설정"
      className="flex-row justify-start items-center gap-3"
    >
      <div className="w-full flex flex-row justify-between">
        <p className="text-zinc-950 dark:text-zinc-50 text-base">다크모드</p>
        <Switch
          initialValue={isDark}
          onChange={(checked) => setIsDark(checked)}
        />
      </div>
    </SettingSection>
  );
}
