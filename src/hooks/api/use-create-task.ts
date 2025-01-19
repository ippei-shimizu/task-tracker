import { useCallback } from "react";

type TaskRequestDTO = {
  name: string;
  deadline: string;
  userId: string;
};

export const useCreateTask = () => {
  const createTask = useCallback(async (task: TaskRequestDTO): Promise<void> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create task");
    }
  }, []);

  return { createTask };
};
