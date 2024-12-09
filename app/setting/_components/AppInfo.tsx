import SettingSection from "./SettingSection";

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="w-full flex flex-row justify-between">
      <p className="text-zinc-950 dark:text-zinc-50 text-base font-medium">
        {label}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-base font-normal">
        {value}
      </p>
    </div>
  );
}

function Separator() {
  return <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />;
}

export default function AppInfo() {
  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString();

  return (
    <SettingSection
      title="애플리케이션 정보"
      className="flex-col justify-start items-center gap-3"
    >
      <InfoRow label="서비스명" value="DormiTalk-Web" />
      <Separator />
      <InfoRow label="Front-end 개발" value="김태현" />
      <InfoRow label="Back-end 개발" value="김태현, 이기찬" />
      <InfoRow label="Client 개발" value="김태현" />
      <InfoRow label="UI/UX 디자인" value="김태현, 이종현" />
      <Separator />
      <InfoRow label="빌드 시간" value={buildTime} />
    </SettingSection>
  );
}
