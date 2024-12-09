import Link from "next/link";

interface AddButtonProps {
  href?: string;
  text: string;
  onClick?: () => void;
}

export default function AddButton({ href, text, onClick }: AddButtonProps) {
  const buttonContent = (
    <div className="w-full px-4 py-3 bg-zinc-900 dark:bg-zinc-100 rounded-xl flex items-center">
      <div className="flex-grow flex justify-center">
        <p className="text-zinc-50 dark:text-zinc-950 text-sm font-medium">
          {text}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="w-full">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {buttonContent}
    </button>
  );
}
