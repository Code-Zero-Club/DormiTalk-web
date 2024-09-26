"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiMusicNote, HiCalendar, HiAdjustments } from "react-icons/hi";
import { IconType } from "react-icons";

interface NavLinkProps {
  href: string;
  icon: IconType;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors duration-200 ease-in-out 
        hover:text-zinc-600 dark:hover:text-zinc-300
        ${
          isActive
            ? "text-zinc-800 dark:text-zinc-100"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
    >
      <Icon size={32} />
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav
      className="flex flex-row px-5 py-4 justify-between rounded-tl-3xl rounded-tr-3xl 
      bg-white dark:bg-zinc-950
      shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.06),0_-1px_2px_-1px_rgba(0,0,0,0.06)]
      dark:shadow-[0_-2px_4px_-1px_rgba(200,200,200,0.06),0_-1px_2px_-1px_rgba(200,200,200,0.06)]"
    >
      <NavLink href="/" icon={HiHome} />
      <NavLink href="/playlist" icon={HiMusicNote} />
      <NavLink href="/scheduler" icon={HiCalendar} />
      <NavLink href="/setting" icon={HiAdjustments} />
    </nav>
  );
};

export default Nav;
