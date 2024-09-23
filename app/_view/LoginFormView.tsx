import Link from "next/link";

export default function LoginFormView() {
  return (
    <div className="w-full h-full flex px-5 pt-32 pb-9 bg-zinc-50 dark:bg-zinc-950 flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-center text-neutral-950 dark:text-neutral-50 text-4xl logo-font">
          도미톡!
        </h1>
        <p className="text-center text-zinc-500 text-sm">
          미래형 기숙사 관리 시스템
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <Link href={""} className="w-full">
            <div className="w-full px-6 py-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl justify-center items-center gap-2.5">
              <p className="text-center text-black dark:text-white text-sm">
                Google로 로그인
              </p>
            </div>
          </Link>
          <Link href={""} className="w-full">
            <div className="w-full px-6 py-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl justify-center items-center gap-2.5">
              <p className="text-center text-black dark:text-white text-sm">
                Key로 로그인
              </p>
            </div>
          </Link>
        </div>
        <p className="text-center text-zinc-500 text-xs">
          로그인이 정상적으로 안되시나요?
        </p>
      </div>
    </div>
  );
}
