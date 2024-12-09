import PlayTimeInput from "./PlayTimeInput";
import PlayWeekSelector from "./PlayWeekSelector";

export default function Options() {
  return (
    <div className="w-full flex flex-col p-5 gap-6">
      <PlayWeekSelector />
      <PlayTimeInput />
    </div>
  );
}
