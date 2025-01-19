import { db } from "@/lib/firebase-config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useCallback } from "react";

type TaskResponseDTO = {
  name: string;
  deadline: string;
  completed: boolean;
  userId: string;
};

export const useCreateTask = () => {
  const createTask = useCallback(async (task: TaskResponseDTO): Promise<void> => {
    await addDoc(collection(db, "tasks"), {
      name: task.name,
      deadline: Timestamp.fromDate(new Date(task.deadline)),
      completed: task.completed,
      userId: task.userId,
    });
  }, []);

  return { createTask };
};
