"use client";

import LoginButton from "@/app/_components/buttons/login-button";
import Spinner from "@/app/_components/spinner";
import { auth } from "@/hooks/use-google-auth";
import { useAuthStore } from "@/stores/use-auth-store";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
  const [user] = useAuthState(auth);
  const { loading } = useAuthStore();
  return (
    <header className="border-b border-gray-100">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="text-black text-lg font-bold">
          <Link href={`${user ? "/tasks" : "/"}`}>Task Tracker</Link>
        </h1>
        <div>
          <LoginButton />
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/15 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
    </header>
  );
}
