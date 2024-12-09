import AddButton from "../_components/AddButton";
import MusicList from "../_components/MusicList";

export default function SettingContentView() {
  return (
    <main className="h-full flex flex-col items-center px-5 py-4 gap-6">
      <AddButton text="곡 추가" />
      <MusicList />
    </main>
  );
}
