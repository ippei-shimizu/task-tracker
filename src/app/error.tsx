import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-6">
      <h1 className="text-2xl font-bold text-gray-800">500 - サーバーエラーが発生しました</h1>
      <Link href="/" className="bg-buttonBg text-base text-black py-3 px-5 rounded-md block w-fit font-semibold">
        トップページへ
      </Link>
    </div>
  );
}
