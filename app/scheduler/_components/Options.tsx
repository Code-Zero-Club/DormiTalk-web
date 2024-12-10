import PlayTimeInput from "./PlayTimeInput";
import PlayWeekSelector from "./PlayWeekSelector";

interface OptionsProps {
  dayOfWeek: string[];
  playTime: string;
}

export default function Options({ dayOfWeek, playTime }: OptionsProps) {
  return (
    <div className="w-full flex flex-col p-5 gap-6">
      <PlayWeekSelector dayOfWeek={dayOfWeek} />
      <PlayTimeInput playTime={playTime} />
    </div>
  );
}
