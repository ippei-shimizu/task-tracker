"use client";

import LoginButton from "@/app/_components/buttons/login-button";
import { auth } from "@/hooks/use-google-auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
  const [user] = useAuthState(auth);
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
    </header>
  );
}
