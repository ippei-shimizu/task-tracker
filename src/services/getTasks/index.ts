import { Task } from "@/types/task";
import axios from "axios";

type TaskResponseDTO = {
  tasks: Task[];
};

export async function getTasks() {
  const response = await axios.get<TaskResponseDTO>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = response.data.tasks;

  return tasks;
}
