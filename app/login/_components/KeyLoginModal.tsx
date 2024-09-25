import React, { useState, useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";

interface KeyLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyLoginModal({ isOpen, onClose }: KeyLoginModalProps) {
  const [key, setKey] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsAnimatingIn(true), 50);
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        console.log("Login successful");
        onClose();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-zinc-50 dark:bg-zinc-950 z-50 transition-opacity duration-300 ${
        isAnimatingIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full h-full flex flex-col transition-transform duration-300 ease-out transform ${
          isAnimatingIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center p-5">
          <button
            onClick={onClose}
            className="text-zinc-400"
            aria-label="Close modal"
          >
            <LuArrowLeft size={24} />
          </button>
        </div>
        <div className="h-full px-5 pt-4 pb-5">
          <form onSubmit={handleSubmit} className="h-full">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-20">
                <div className="flex flex-col gap-2">
                  <h2 className="text-black dark:text-white text-2xl font-bold">
                    부여받은
                    <br />
                    Key를 입력해주세요
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                    허가받은 이용자만 접근 가능합니다
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start gap-3">
                  <p className="text-zinc-400 dark:text-zinc-500 text-base">
                    로그인 키
                  </p>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full h-12 relative bg-transparent focus:outline-none border-b border-zinc-300 dark:border-zinc-500 text-black dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-4 bg-zinc-900 dark:bg-zinc-100 rounded-2xl justify-center items-center text-white dark:text-black text-lg font-medium"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
