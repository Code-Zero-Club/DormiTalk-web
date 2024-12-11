"use client";

import { useState, useCallback } from "react";
import AddButton from "../_components/AddButton";
import MusicList from "../_components/MusicList";
import AddMusicModal from "../_components/AddMusicModal";

export default function SettingContentView() {
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddMusicClick = () => {
    setIsAddMusicModalOpen(true);
  };

  const handleRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <main className="h-full flex flex-col items-center px-5 py-4 gap-6">
      <AddButton text="곡 추가" onClick={handleAddMusicClick} />
      <MusicList key={refreshTrigger} />
      <AddMusicModal
        isOpen={isAddMusicModalOpen}
        onClose={() => setIsAddMusicModalOpen(false)}
        onSuccess={handleRefresh}
      />
    </main>
  );
}
