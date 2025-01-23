import { USER_ID } from "@/constants";
import { Task } from "@/types/task";
import axios from "axios";
import { cookies } from "next/headers";

export async function getTaskById(id: string): Promise<Task> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID)?.value;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
    params: { id },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch task");
  }

  const task = response.data;

  return task;
}
