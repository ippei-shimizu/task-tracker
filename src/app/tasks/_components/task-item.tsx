"use client";

import { useCompletedTask } from "@/hooks/api/use-completed-task";
import { Task } from "@/types/task";
import { formatDateToYYYYMMDD } from "@/utils/format-date";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { completedTask } = useCompletedTask();
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleCompletedTask = async () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    try {
      await completedTask({ id: task.id, completed: !task.completed, userId: task.userId });
      if (newCompleted) {
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("タスクの更新に失敗しました。");
      setIsCompleted(!newCompleted);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-black text-base font-semibold">{task.name}</p>
        <span className="text-sm text-[#637587]">Due {formatDateToYYYYMMDD(task.deadline)}</span>
      </div>
      <div className="flex items-center gap-x-4">
        <div>
          <label className="relative flex items-center cursor-pointer">
            <input type="checkbox" onChange={handleCompletedTask} checked={isCompleted} className="sr-only peer" />
            <div className="w-5 h-5 border-[2px] border-[#DBE0E5] rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors">
              {isCompleted && (
                <svg
                  className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>
        </div>
        <div>
          <Link href={`/task/${task.id}/edit`} className="text-sm text-blue-500 hover:underline">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
