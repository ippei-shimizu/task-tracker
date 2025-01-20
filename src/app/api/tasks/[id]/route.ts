import { adminFirestore } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { completed } = body;
    if (typeof completed !== "boolean") {
      return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    const taskRef = adminFirestore.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await taskRef.update({
      completed,
    });

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
  }
}
