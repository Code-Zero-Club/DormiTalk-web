import Link from "next/link";

export default function LoginFunnelView() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="mb-8">
        <h1 className="font-pretendard text-3xl font-bold text-white">DMS</h1>
      </div>
      <div>
        <Link 
          href={"https://waktaverse.games/"} 
          className="bg-gray-50 hover:bg-gray-100 text-black text-lg py-4 px-8 rounded-lg transition duration-300 ease-in-out"
        >
          Google로 로그인
        </Link>
      </div>
    </div>
  );
}