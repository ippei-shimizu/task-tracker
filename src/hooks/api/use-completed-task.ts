import axios from "axios";
import { useCallback } from "react";

type CompletedTaskDTO = {
  id: string;
  completed: boolean;
};

export const useCompletedTask = () => {
  const completedTask = useCallback(async (task: CompletedTaskDTO): Promise<void> => {
    const response = await axios.patch(`/api/tasks/${task.id}`, {
      completed: task.completed,
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to update task");
    }
  }, []);

  return { completedTask };
};
