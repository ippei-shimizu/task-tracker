import { ACCESS_TOKEN } from "@/constants";
import app from "@/lib/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useCallback } from "react";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const useGoogleAuth = () => {
  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const accessToken = await user.getIdToken();
      Cookies.set(ACCESS_TOKEN, accessToken, { expires: 30, sameSite: "strict", httpOnly: false });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const signOutWithGoogle = useCallback(async () => {
    try {
      await auth.signOut();
      Cookies.remove("accessToken");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return { signInWithGoogle, signOutWithGoogle };
};
