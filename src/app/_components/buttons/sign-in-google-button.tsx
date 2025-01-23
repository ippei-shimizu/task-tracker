"use client";

import Spinner from "@/app/_components/spinner";
import { auth, useGoogleAuth } from "@/hooks/use-google-auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function SignInGoogleButton() {
  const [user, isLoading] = useAuthState(auth);
  const { signInWithGoogle } = useGoogleAuth();
  const router = useRouter();
  const { loading, setLoading } = useAuthStore();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      setTimeout(() => {
        router.push("/tasks");
        toast.success("ログインしました");
      }, 4000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }, [signInWithGoogle, router, setLoading]);

  if (isLoading || user) {
    return null;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
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
