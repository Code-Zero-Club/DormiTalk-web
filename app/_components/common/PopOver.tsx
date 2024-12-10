import React, { ReactNode, useEffect, useRef, useState } from "react";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "start" | "end";
}

export default function Popover({
  trigger,
  content,
  align = "end",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${
            align === "end" ? "right-0" : "left-0"
          } min-w-[8rem] rounded-lg bg-white dark:bg-zinc-800 shadow-lg border border-zinc-200 dark:border-zinc-700 py-1`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
