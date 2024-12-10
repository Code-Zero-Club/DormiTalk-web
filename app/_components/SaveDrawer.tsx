export default function SaveDrawer() {
  return (
    <nav className="absolute bottom-16 left-0 right-0 h-20 bg-white dark:bg-black rounded-tl-2xl rounded-tr-2xl">
      <div className="max-w-md mx-auto h-full flex justify-center items-center px-5">
        <button className="w-full h-12 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 font-bold rounded-xl">
          저장
        </button>
      </div>
    </nav>
  );
}
