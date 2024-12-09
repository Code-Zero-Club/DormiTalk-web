import SettingSection from "./SettingSection";

export default function AdditionalSettings() {
  return (
    <SettingSection
      title="부가 설정"
      className="flex-row justify-start items-center gap-3"
    >
      <div className="w-full flex flex-row justify-between">
        <p className="text-zinc-950 dark:text-zinc-50 text-base">다크모드</p>
        <p className="text-zinc-600 dark:text-zinc-400 text-base">
          코레와 스위치
        </p>
      </div>
    </SettingSection>
  );
}
