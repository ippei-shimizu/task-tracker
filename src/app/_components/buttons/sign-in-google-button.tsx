"use client";

import { useGoogleAuth } from "@/hooks/user-google-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SignInGoogleButton() {
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

  return (
    <button
      onClick={handleGoogleSignIn}
      className="block text-black text-sm font-bold mx-auto w-[448px] py-2 bg-buttonBg rounded-[12px]"
    >
      Sign in with Google
    </button>
  );
}
