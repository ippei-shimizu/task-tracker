import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccountKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString("utf-8"))
    : null;

  if (!serviceAccountKey) {
    throw new Error("Missing Google Application Credentials");
  }

  initializeApp({
    credential: cert(serviceAccountKey),
  });
}

export const adminFirestore = getFirestore();
export const adminAuth = getAuth();
