"use client";

import { auth, useGoogleAuth } from "@/hooks/user-google-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginButton() {
  const [user, isLoading] = useAuthState(auth);
  const { signInWithGoogle, signOutWithGoogle } = useGoogleAuth();
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    try {
      await signInWithGoogle();
      router.push("/top");
    } catch (error) {
      console.error(error);
    }
  }, [router, signInWithGoogle]);

  const handleLogout = useCallback(async () => {
    try {
      await signOutWithGoogle();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [router, signOutWithGoogle]);

  if (isLoading) return <div className="h-10"></div>;

  return (
    <>
      {user ? (
        <button onClick={handleLogout} className="text-black text-sm font-bold rounded-lg bg-buttonBg px-[10px] h-10">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="text-black text-sm font-bold rounded-lg bg-buttonBg px-[10px] h-10">
          Login
        </button>
      )}
    </>
  );
}
