import React, { useState, useEffect } from "react";
import { ArrowLeft } from "iconsax-react";
import AddMusicCard from "./AddMusicCard";
import {
  YouTubeService,
  VideoSearchResult,
} from "@/app/services/youtube.service";

interface AddMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoWithDuration extends VideoSearchResult {
  playtime?: string;
}

export default function AddMusicModal({ isOpen, onClose }: AddMusicModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<VideoWithDuration[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsAnimatingIn(true), 50);
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setQuery("");
        setSearchResults([]);
        setError(undefined);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;

    try {
      setIsSearching(true);
      setError(undefined);

      const response = await YouTubeService.search(query, undefined, 5);

      if (response.error) {
        setError(response.error);
        return;
      }

      // 검색 결과를 임시로 저장
      setSearchResults(response.data.videos);

      // 각 비디오의 재생 시간 조회
      const videosWithDuration = await Promise.all(
        response.data.videos.map(async (video) => {
          try {
            const durationResponse = await YouTubeService.getVideoDuration(
              video.videoId
            );
            return {
              ...video,
              playtime: durationResponse.data,
            };
          } catch (err) {
            console.error(
              `Failed to get video duration for video ID ${video.videoId}:`,
              err
            );
            return video;
          }
        })
      );

      setSearchResults(videosWithDuration);
    } catch (err) {
      setError("검색 중 오류가 발생했습니다: " + err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectVideo = (video: VideoWithDuration) => {
    // 선택된 비디오 정보 처리
    console.log({
      title: video.title,
      youtube_id: video.videoId,
      play_time: video.playtime,
    });
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-zinc-50 dark:bg-zinc-950 z-50 transition-opacity duration-300 ${
        isAnimatingIn ? "opacity-100" : "opacity-0"
      } flex justify-center items-center`}
    >
      <div
        className={`w-full max-w-md h-full flex flex-col transition-transform duration-300 ease-out transform ${
          isAnimatingIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center p-5">
          <button
            onClick={onClose}
            className="text-zinc-400"
            aria-label="Close modal"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="h-full px-5 pt-4 pb-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-black dark:text-white text-2xl font-bold">
              추가할 음악을 선택해주세요
            </h2>
            <div className="h-12 px-4 flex flex-row bg-zinc-100 dark:bg-zinc-900 rounded-xl justify-between items-center">
              <input
                className="bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 w-full outline-none"
                placeholder="검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {error && <div className="text-red-500 text-sm px-2">{error}</div>}

            <div className="w-full flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
              {isSearching ? (
                <div className="p-4 text-zinc-500 dark:text-zinc-400 text-center">
                  검색 중...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((video) => (
                  <AddMusicCard
                    key={video.videoId}
                    thumbnail={video.thumbnail}
                    title={video.title}
                    playtime={video.playtime || "N/A"}
                    onClick={() => handleSelectVideo(video)}
                  />
                ))
              ) : query.trim() ? (
                <div className="p-4 text-zinc-500 dark:text-zinc-400 text-center">
                  검색 결과가 없습니다
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
