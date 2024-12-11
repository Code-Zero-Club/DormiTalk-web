"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SettingSection from "./SettingSection";
import { AuthService } from "@/app/services/auth.service";
import { toast } from "react-hot-toast";

export default function AccountInfo() {
  const router = useRouter();
  const userDescription = AuthService.getDescription();

  const handleLogout = () => {
    try {
      AuthService.logout();
      router.push("/login");
      toast.success("로그아웃 되었습니다.");
    } catch (error) {
      console.error("Logout failed: ", error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

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
          <p className="text-zinc-950 dark:text-zinc-50 text-base font-semibold">
            {userDescription}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal">
            어드민 계정
          </p>
        </div>
        <button
          className="text-red-500 text-sm font-semibold hover:underline"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </SettingSection>
  );
}
