import Logo from "@/public/images/Logo.svg";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex flex-row px-5 py-3 bg-zinc-50 dark:bg-zinc-950 gap-2 items-center">
      <Logo
        width={32}
        height={32}
        className="text-zinc-950 dark:text-zinc-50"
      />
      <p className="text-lg font-bold logo-font text-zinc-950 dark:text-zinc-50">
        {title}
      </p>
    </div>
  );
}
