"use client";

import Spinner from "@/app/_components/spinner";
import { auth, useGoogleAuth } from "@/hooks/use-google-auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function SignInGoogleButton() {
  const [user, isLoading] = useAuthState(auth);
  const { signInWithGoogle } = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      setLoading(true);
      setTimeout(() => {
        router.push("/tasks");
        toast.success("ログインしました");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }, [signInWithGoogle, router]);

  if (isLoading || user) {
    return null;
  }

  return (
    <>
      <h2 className="text-black text-2xl text-center font-bold">ログイン</h2>
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="block text-black text-sm font-bold mx-auto w-[448px] py-2 bg-buttonBg rounded-[12px]"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </>
  );
}
