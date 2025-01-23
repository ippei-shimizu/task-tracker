import { adminFirestore } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updateFields: Partial<{ name: string; deadline: Timestamp; completed: boolean }> = {};

    const { name } = body;
    if (typeof name === "string") {
      updateFields.name = name;
    }

    const { deadline } = body;
    if (typeof deadline === "string") {
      updateFields.deadline = Timestamp.fromDate(new Date(body.deadline));
    }

    const { completed } = body;
    if (typeof completed !== "boolean") {
      return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    const userId = authHeader.replace("Bearer ", "");

    const taskRef = adminFirestore.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const taskData = taskDoc.data();

    if (taskData?.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!taskDoc.exists) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await taskRef.update({
      ...updateFields,
      completed,
    });

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
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
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const taskRef = adminFirestore.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const taskData = taskDoc.data();

    if (taskData?.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const task = {
      id: taskDoc.id,
      ...taskData,
      deadline: taskData?.deadline?.toDate(),
    };

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ message: "Failed to fetch task" }, { status: 500 });
  }
}
