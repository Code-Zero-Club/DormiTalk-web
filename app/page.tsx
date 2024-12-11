import { Box2 } from "iconsax-react";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <Box2 className="size-20 text-zinc-500" />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-zinc-950 dark:text-zinc-50 font-bold text-xl">
            메인 페이지는 아직 준비중이에요!
          </h1>
          <p className="text-zinc-500">사실 뭐 넣을지 모르겠어요.</p>
        </div>
      </div>
    </main>
  );
}
