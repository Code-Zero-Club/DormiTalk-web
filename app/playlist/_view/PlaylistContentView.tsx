"use client";

import { useState } from "react";
import AddButton from "../_components/AddButton";
import MusicList from "../_components/MusicList";
import AddMusicModal from "../_components/AddMusicModal";

export default function SettingContentView() {
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);

  const handleAddMusicClick = () => {
    setIsAddMusicModalOpen(true);
  };

  return (
    <main className="h-full flex flex-col items-center px-5 py-4 gap-6">
      <AddButton text="곡 추가" onClick={handleAddMusicClick} />
      <MusicList />
      <AddMusicModal
        isOpen={isAddMusicModalOpen}
        onClose={() => setIsAddMusicModalOpen(false)}
      />
    </main>
  );
}
