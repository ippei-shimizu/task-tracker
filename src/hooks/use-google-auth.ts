import { USER_ID } from "@/constants";
import { app } from "@/lib/firebase-config";
import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useCallback } from "react";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const useGoogleAuth = () => {
  const { setLoading } = useAuthStore();
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const accessToken = await user.getIdToken();
      await axios.post("/api/auth/login", { accessToken, userId: user.uid });
      return user;
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error;
    }
  }, [setLoading]);

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
