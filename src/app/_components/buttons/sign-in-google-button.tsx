"use client";

import { useGoogleAuth } from "@/hooks/use-google-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function SignInGoogleButton() {
  const { signInWithGoogle } = useGoogleAuth();
  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      router.push("/tasks");
      router.refresh();
      toast.success("ログインしました");
    } catch (error) {
      console.error(error);
      toast.error("ログインに失敗しました");
    }
  }, [signInWithGoogle, router]);

  return (
    <>
      <h2 className="text-black text-2xl text-center font-bold">ログイン</h2>
      <div className="mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="block text-black text-sm font-bold mx-auto w-[448px] py-2 bg-buttonBg rounded-[12px]"
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}
