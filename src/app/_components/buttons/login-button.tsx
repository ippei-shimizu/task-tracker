"use client";

import { auth, useGoogleAuth } from "@/hooks/user-google-auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginButton() {
  const [user, isLoading] = useAuthState(auth);
  const { signOutWithGoogle } = useGoogleAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutWithGoogle();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="h-10"></div>;

  return (
    <>
      {user ? (
        <button onClick={handleLogout} className="text-black text-sm font-bold rounded-lg bg-buttonBg px-[10px] h-10">
          Logout
        </button>
      ) : (
        <button className="text-black text-sm font-bold rounded-lg bg-buttonBg px-[10px] h-10">Login</button>
      )}
    </>
  );
}
