import Image from "next/image";

interface AddMusicCardProps {
  thumbnail: string;
  title: string;
  playtime: string;
}

export default function AddMusicCard({
  thumbnail,
  title,
  playtime,
}: AddMusicCardProps) {
  return (
    <div className="flex flex-row items-center p-3 gap-3">
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
