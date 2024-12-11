import Image from "next/image";

interface AddMusicCardProps {
  thumbnail: string;
  title: string;
  playtime: string;
  onClick?: () => void;
}

export default function AddMusicCard({
  thumbnail,
  title,
  playtime,
  onClick,
}: AddMusicCardProps) {
  return (
    <div
      className="flex flex-row items-center p-3 gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
      onClick={onClick}
    >
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
    </div>
  );
}
