import StartTimeSelector from "../_components/StartTimeSelector";
import Options from "../_components/Options";

export default function SchedulerContentView() {
  return (
    <main className="h-full flex flex-col items-center">
      <StartTimeSelector />
      <Options />
    </main>
  );
}
