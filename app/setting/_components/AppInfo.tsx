import SettingSection from "./SettingSection";

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="w-full flex flex-row justify-between">
      <p className="text-zinc-50 text-base">{label}</p>
      <p className="text-zinc-400 text-base">{value}</p>
    </div>
  );
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
      <div className="w-full h-px bg-zinc-800" />
      <InfoRow label="Front-end 개발" value="김태현" />
      <InfoRow label="Back-end 개발" value="김태현, 이기찬" />
      <InfoRow label="Client 개발" value="김태현" />
      <InfoRow label="UI/UX 디자인" value="김태현, 이종현" />
      <div className="w-full h-px bg-zinc-800" />
      <InfoRow label="빌드 버전" value={buildTime} />
    </SettingSection>
  );
}
