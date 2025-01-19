import SignInGoogleButton from "@/app/_components/buttons/sign-in-google-button";

export default function Home() {
  return (
    <main>
      <div className="w-11/12 max-w-[1184px] mx-auto py-5">
        <h2 className="text-black text-2xl text-center font-bold">ログイン</h2>
        <div className="mt-4">
          <SignInGoogleButton />
        </div>
      </div>
    </main>
  );
}
