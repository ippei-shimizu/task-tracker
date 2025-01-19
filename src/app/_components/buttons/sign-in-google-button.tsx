"use client";

import { auth, useGoogleAuth } from "@/hooks/user-google-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignInGoogleButton() {
  const [user, isLoading] = useAuthState(auth);
  const router = useRouter();
  const { signInWithGoogle } = useGoogleAuth();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google Login User", user);
      router.push("/top");
    } catch (error) {
      console.error(error);
    }
  }, [router, signInWithGoogle]);

  if (isLoading || user) {
    return null;
  }

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
