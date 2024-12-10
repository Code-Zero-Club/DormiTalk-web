import React, { useState, useEffect } from "react";
import { ArrowLeft } from "iconsax-react";

interface AddMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMusicModal({ isOpen, onClose }: AddMusicModalProps) {
  // const [key, setKey] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);

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

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-zinc-50 dark:bg-zinc-950 z-50 transition-opacity duration-300 ${
        isAnimatingIn ? "opacity-100" : "opacity-0"
      } flex justify-center items-center`}
    >
      <div
        className={`w-full max-w-md h-full flex flex-col transition-transform duration-300 ease-out transform ${
          isAnimatingIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center p-5">
          <button
            onClick={onClose}
            className="text-zinc-400"
            aria-label="Close modal"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="h-full px-5 pt-4 pb-5"></div>
      </div>
    </div>
  );
}
