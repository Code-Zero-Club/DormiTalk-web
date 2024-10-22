"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home2, Musicnote, Timer1, Setting2 } from "iconsax-react";
import { IconProps } from "iconsax-react";

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<IconProps>;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-6 transition-colors duration-200 ease-in-out 
        ${
          isActive
            ? "text-zinc-800 dark:text-zinc-100"
            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
    >
      <Icon size={24} variant={isActive ? "Bold" : "Outline"} />
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav className="h-16 bg-white dark:bg-black justify-between items-center inline-flex">
      <NavLink href="/" icon={Home2} />
      <NavLink href="/playlist" icon={Musicnote} />
      <NavLink href="/scheduler" icon={Timer1} />
      <NavLink href="/setting" icon={Setting2} />
    </nav>
  );
};

export default Nav;
