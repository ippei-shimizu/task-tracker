import axios from "axios";
import { useCallback } from "react";

type UpdateTaskDTO = {
  id: string;
  name: string;
  deadline: Date;
  completed: boolean;
  userId: string;
};

export const useUpdateTask = () => {
  const updateTask = useCallback(async (task: UpdateTaskDTO): Promise<void> => {
    const response = await axios.patch(`/api/tasks/${task.id}`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${task.userId}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to update task");
    }
  }, []);

  return { updateTask };
};
