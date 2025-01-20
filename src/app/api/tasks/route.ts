import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

if (!getApps().length) {
  const serviceAccountKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString("utf-8"))
    : null;

  initializeApp({
    credential: cert(serviceAccountKey),
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, deadline } = body;

    if (!userId || !name || !deadline) {
      return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    await db.collection("tasks").add({
      name,
      deadline: new Date(deadline),
      completed: false,
      userId,
    });

    return NextResponse.json({ message: "Task created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = authHeader.replace("Bearer ", "");

    const tasks = db.collection("tasks");
    const snapshot = await tasks.where("userId", "==", userId).orderBy("deadline").get();
    const tasksList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline.toDate(),
    }));

    return NextResponse.json({ tasks: tasksList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}
