import Image from "next/image";
import { HambergerMenu, More } from "iconsax-react";

interface MusicCardProps {
  thumbnail: string;
  title: string;
  playtime: string;
}

export default function MusicCard({
  thumbnail,
  title,
  playtime,
}: MusicCardProps) {
  return (
    <div className="flex flex-row items-center p-3 gap-3">
      <HambergerMenu
        size="24"
        className="text-zinc-300 dark:text-zinc-700 cursor-pointer"
      />
      <Image
        src={thumbnail}
        width={48}
        height={48}
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
      <More
        size="24"
        className="text-zinc-800 dark:text-zinc-200 cursor-pointer"
      />
    </div>
  );
}
