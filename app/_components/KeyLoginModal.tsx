import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

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
      className={`fixed inset-0 bg-white dark:bg-zinc-900 z-50 transition-opacity duration-300 ${
        isAnimatingIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full h-full flex flex-col transition-transform duration-300 ease-out transform ${
          isAnimatingIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <IoArrowBack size={24} />
          </button>
          <h2 className="text-xl font-bold ml-4 text-gray-900 dark:text-white">
            Key로 로그인
          </h2>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="키를 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
