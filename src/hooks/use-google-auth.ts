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
      const response = await axios.post("/api/auth/login", { accessToken, userId: user.uid });
      if (response.status === 200) {
        const checkSessionCookie = () => Cookies.get("SESSION");
        const maxRetries = 10;
        let retries = 0;

        while (!checkSessionCookie() && retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          retries++;
        }
        if (checkSessionCookie()) {
          router.push("/tasks");
        }
      }
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
