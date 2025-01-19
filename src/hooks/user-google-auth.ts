import app from "@/lib/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback } from "react";

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const useGoogleAuth = () => {
  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const signOutWithGoogle = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return { signInWithGoogle, signOutWithGoogle };
};
