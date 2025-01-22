import { USER_ID } from "@/constants";
import { Task } from "@/types/task";
import axios from "axios";
import { cookies } from "next/headers";

type TaskResponseDTO = {
  tasks: Task[];
};

export async function getTasks(filter: string): Promise<Task[]> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID)?.value;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const response = await axios.get<TaskResponseDTO>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
    params: { filter },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = response.data.tasks;

  return tasks;
}
