"use client";

import { signInWithGoogle } from "@/lib/auth";
import { useCallback } from "react";

export default function SignInGoogleButton() {
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google Login User", user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="block text-black text-sm font-bold mx-auto w-[448px] py-2 bg-buttonBg rounded-[12px]"
    >
      Sign in with Google
    </button>
  );
}
