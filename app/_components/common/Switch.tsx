"use client";

interface SwitchProps {
  value: boolean;
  onChange?: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  label?: string;
}

export default function Switch({
  value,
  onChange,
  size = "medium",
  disabled = false,
  label,
}: SwitchProps) {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!value);
  };

  const sizes = {
    small: {
      toggle: "w-8 h-4",
      circle: "w-3 h-3",
      translate: "translate-x-4",
    },
    medium: {
      toggle: "w-10 h-5",
      circle: "w-4 h-4",
      translate: "translate-x-5",
    },
    large: {
      toggle: "w-12 h-6",
      circle: "w-5 h-5",
      translate: "translate-x-6",
    },
  };

  const selectedSize = sizes[size];

  return (
    <label className="inline-flex items-center gap-2">
      {label && (
        <span className="text-sm text-zinc-900 dark:text-zinc-100 dark-transition">
          {label}
        </span>
      )}
      <button
        role="switch"
        aria-checked={value}
        onClick={handleToggle}
        className={`
          relative rounded-full dark-transition
          ${selectedSize.toggle}
          ${
            value
              ? "bg-zinc-900 dark:bg-zinc-100"
              : "bg-zinc-200 dark:bg-zinc-800"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        disabled={disabled}
      >
        <span
          className={`
            absolute top-0.5 left-0.5
            rounded-full bg-white dark:bg-black dark-transition
            transition-transform duration-300 ease-in-out
            ${selectedSize.circle}
            ${value ? selectedSize.translate : "translate-x-0"}
          `}
        />
      </button>
    </label>
  );
}
