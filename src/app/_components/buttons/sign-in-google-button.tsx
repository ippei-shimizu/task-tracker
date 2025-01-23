"use client";

import { auth, useGoogleAuth } from "@/hooks/use-google-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function SignInGoogleButton() {
  const [user, isLoading] = useAuthState(auth);
  const { signInWithGoogle } = useGoogleAuth();
  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      router.push("/tasks");
      toast.success("ログインしました");
    } catch (error) {
      console.error(error);
      toast.error("ログインに失敗しました");
    }
  }, [signInWithGoogle, router]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {user ? (
        <Link
          href="/tasks"
          className="block text-black text-sm font-bold mx-auto w-fit py-2 px-4 bg-buttonBg rounded-[12px] text-center"
        >
          タスク一覧へ
        </Link>
      ) : (
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
      )}
    </>
  );
}
