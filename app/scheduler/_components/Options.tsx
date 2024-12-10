import PlayTimeInput from "./PlayTimeInput";
import PlayWeekSelector from "./PlayWeekSelector";

interface OptionsProps {
  dayOfWeek: string[];
  playTime: string;
  onDayOfWeekChange: (days: string[]) => void;
  onPlayTimeChange: (time: string) => void;
}

export default function Options({
  dayOfWeek,
  playTime,
  onDayOfWeekChange,
  onPlayTimeChange,
}: OptionsProps) {
  return (
    <div className="w-full flex flex-col p-5 gap-6">
      <PlayWeekSelector
        dayOfWeek={dayOfWeek}
        onDayOfWeekChange={onDayOfWeekChange}
      />
      <PlayTimeInput playTime={playTime} onPlayTimeChange={onPlayTimeChange} />
    </div>
  );
}
