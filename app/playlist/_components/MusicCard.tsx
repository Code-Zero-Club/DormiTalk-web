import Image from "next/image";
import { HambergerMenu, More, Link1, Trash } from "iconsax-react";
import Popover from "@/app/_components/common/PopOver";

interface MusicCardProps {
  thumbnail: string;
  title: string;
  playtime: string;
  youtubeId: string;
}

export default function MusicCard({
  thumbnail,
  title,
  playtime,
  youtubeId,
}: MusicCardProps) {
  const handleOpenYoutube = () => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  const handleDelete = () => {
    alert("삭제되었습니다.");
  };

  return (
    <div className="flex flex-row items-center p-3 gap-3">
      <HambergerMenu
        size="24"
        className="text-zinc-300 dark:text-zinc-700 cursor-pointer"
      />
      <Image
        src={thumbnail}
        width={128}
        height={128}
        alt="thumbnail"
        className="size-12 rounded-md object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-zinc-950 dark:text-zinc-50 text-sm font-semibold truncate">
          {title}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-xs font-normal">
          {playtime}
        </p>
      </div>
      <Popover
        trigger={
          <button>
            <More
              size="24"
              className="text-zinc-800 dark:text-zinc-200 cursor-pointer"
            />
          </button>
        }
        content={
          <div className="flex flex-col">
            <button
              onClick={handleOpenYoutube}
              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <Link1 size="16" />
              바로가기{" "}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <Trash size="16" />
              삭제
            </button>
          </div>
        }
      />
    </div>
  );
}
