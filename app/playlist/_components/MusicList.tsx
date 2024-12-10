"use client";

import { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import MusicCardSkeleton from "./MusicCardSkeleton";
import MusicCardError from "./MusicCardError";
import MusicCardEmpty from "./MusicCardEmpty";
import { SongService } from "@/app/services/song.service";
import { Song } from "@/app/types/api";

export default function MusicList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SongService.getAll();
      setSongs(response.data);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setError("플레이리스트를 불러오는데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (error) {
    return <MusicCardError message={error} onRetry={fetchSongs} />;
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl">
        {[...Array(5)].map((_, index) => (
          <MusicCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (songs.length === 0) {
    return <MusicCardEmpty onRefresh={fetchSongs} />;
  }

  return (
    <div className="w-full flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl">
      {songs.map((song) => (
        <MusicCard
          key={song.id}
          thumbnail={`https://i.ytimg.com/vi/${song.youtube_id}/mqdefault.jpg`}
          title={song.title}
          playtime={song.play_time}
          youtubeId={song.youtube_id}
        />
      ))}
    </div>
  );
}
