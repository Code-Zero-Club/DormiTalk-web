import Image from "next/image";
import SettingSection from "./SettingSection";

export default function AccountInfo() {
  return (
    <SettingSection
      title="계정 정보"
      className="flex-row justify-start items-center gap-3"
    >
      <Image
        src="https://cataas.com/cat?width=100&height=100"
        width={40}
        height={40}
        alt="profile"
        className="size-10 rounded-full object-cover"
      />
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-start">
          <p className="text-zinc-50 text-base font-semibold">닉네임</p>
          <p className="text-zinc-400 text-sm font-normal">어드민 계정</p>
        </div>
        <p className="text-red-500 text-sm font-semibold hover:underline">
          로그아웃
        </p>
      </div>
    </SettingSection>
  );
}
