"use client";

import { useState } from "react";
import Link from "next/link";
import GoogleIcon from "@/public/icons/google.svg";
import KeyIcon from "@/public/icons/key.svg";
import Logo from "@/public/images/Logo.svg";
import LoginButton from "../_components/LoginButton";
import KeyLoginModal from "../_components/KeyLoginModal";
import { toast } from "react-hot-toast";

export default function LoginFormView() {
  const [isKeyLoginModalOpen, setIsKeyLoginModalOpen] = useState(false);

  const handleGoogleLoginClick = () => {
    toast.error("구글 로그인은 아직 지원되지 않습니다.");
  };

  const handleKeyLoginClick = () => {
    setIsKeyLoginModalOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-5 pt-32 pb-9">
      <div className="flex flex-col justify-center items-center gap-1">
        <Logo
          width={64}
          height={64}
          className="text-zinc-950 dark:text-zinc-50 mb-2"
        />
        <h1 className="text-center text-neutral-950 dark:text-neutral-50 text-4xl logo-font">
          도미톡!
        </h1>
        <p className="text-center text-zinc-500 text-sm">
          미래형 기숙사 관리 시스템
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <LoginButton
            onClick={handleGoogleLoginClick}
            icon={<GoogleIcon width={32} height={32} />}
            text="Google로 로그인"
          />
          <LoginButton
            onClick={handleKeyLoginClick}
            icon={
              <KeyIcon
                width={32}
                height={32}
                className="text-black dark:text-white"
              />
            }
            text="Key로 로그인"
          />
        </div>
        <Link href={""} className="w-full">
          <p className="text-center text-zinc-500 text-xs hover:underline">
            로그인이 정상적으로 안되시나요?
          </p>
        </Link>
      </div>
      <KeyLoginModal
        isOpen={isKeyLoginModalOpen}
        onClose={() => setIsKeyLoginModalOpen(false)}
      />
    </div>
  );
}
