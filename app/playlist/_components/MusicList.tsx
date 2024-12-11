"use client";

import { useState, useEffect, useCallback } from "react";
import MusicCard from "./MusicCard";
import MusicCardSkeleton from "./MusicCardSkeleton";
import MusicCardError from "./MusicCardError";
import MusicCardEmpty from "./MusicCardEmpty";
import { SongService } from "@/app/services/song.service";
import { Song } from "@/app/types/api";

interface MusicListProps {
  onRefresh?: () => void;
}

export default function MusicList({ onRefresh }: MusicListProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SongService.getAll();
      setSongs(response.data);
      onRefresh?.();
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setError("플레이리스트를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [onRefresh]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

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
          id={song.id}
          thumbnail={`https://i.ytimg.com/vi/${song.youtube_id}/mqdefault.jpg`}
          title={song.title}
          playtime={song.play_time}
          youtubeId={song.youtube_id}
          onSuccess={fetchSongs}
        />
      ))}
    </div>
  );
}
