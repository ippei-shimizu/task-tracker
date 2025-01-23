import { USER_ID } from "@/constants";
import { app } from "@/lib/firebase-config";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useCallback } from "react";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const useGoogleAuth = () => {
  const router = useRouter();
  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const accessToken = await user.getIdToken();
      await axios.post("/api/auth/login", { accessToken, userId: user.uid });
      router.push("/tasks");
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [router]);

  const signOutWithGoogle = useCallback(async () => {
    try {
      await auth.signOut();
      await axios.post("/api/auth/logout");
      Cookies.remove(USER_ID);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return { signInWithGoogle, signOutWithGoogle };
};
