import Link from "next/link";

interface LoginButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

export default function LoginButton({ href, icon, text }: LoginButtonProps) {
  return (
    <Link href={href} className="w-full">
      <div className="w-full px-6 py-4 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-900 rounded-2xl flex items-center transition ease-in-out">
        <div className="absolute">{icon}</div>
        <div className="flex-grow flex justify-center">
          <p className="text-black dark:text-white text-sm">{text}</p>
        </div>
      </div>
    </Link>
  );
}
