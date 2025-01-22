import { adminFirestore } from "@/lib/firebase-admin";
import { OrderByDirection } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, deadline } = body;

    if (!userId || !name || !deadline) {
      return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    await adminFirestore.collection("tasks").add({
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
    const url = new URL(req.url);
    const filter = url.searchParams.get("filter");
    const sort = url.searchParams.get("sort") as OrderByDirection;
    const tasks = adminFirestore.collection("tasks").where("userId", "==", userId);

    let query = tasks;
    if (filter === "completed") {
      query = query.where("completed", "==", true);
    } else if (filter === "incomplete") {
      query = query.where("completed", "==", false);
    }

    const snapshot = await query.orderBy("deadline", sort).get();

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
