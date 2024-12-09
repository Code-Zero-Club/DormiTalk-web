"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home2, Musicnote, Timer1, Setting2 } from "iconsax-react";
import { IconProps } from "iconsax-react";

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<IconProps>;
  ariaLabel?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, ariaLabel }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-6 flex flex-col items-center gap-1.5 transition-colors duration-200 ease-in-out
        ${
          isActive
            ? "text-zinc-800 dark:text-zinc-100"
            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
      aria-label={ariaLabel}
    >
      <Icon size={24} variant={isActive ? "Bold" : "Outline"} />
      {isActive && (
        <div className="w-1 h-1 bg-zinc-800 dark:bg-zinc-100 rounded-full" />
      )}
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-md mx-auto h-full flex justify-between items-center">
        <NavLink href="/" icon={Home2} />
        <NavLink href="/playlist" icon={Musicnote} />
        <NavLink href="/scheduler" icon={Timer1} />
        <NavLink href="/setting" icon={Setting2} />
      </div>
    </nav>
  );
};

export default Nav;
