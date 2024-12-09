interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SettingSection({
  title,
  children,
  className = "",
}: SettingSectionProps) {
  return (
    <div className="w-full flex flex-col justify-start gap-2">
      <h2 className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
        {title}
      </h2>
      <div
        className={`flex px-5 py-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
