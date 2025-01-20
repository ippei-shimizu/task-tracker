import { useCallback } from "react";

export const useGetTasks = () => {
  const getTasks = useCallback(async (): Promise<void> => {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }
  }, []);

  return { getTasks };
};
