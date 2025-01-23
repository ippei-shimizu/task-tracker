"use client";

import { useCreateTask } from "@/hooks/api/use-create-task";
import { useUpdateTask } from "@/hooks/api/use-update-task";
import { auth } from "@/hooks/use-google-auth";
import { Task } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  taskName: z.string().min(1, { message: "タスク名を入力してください" }),
  deadline: z.string().min(1, { message: "締め切りを入力してください" }),
});

type FormData = z.infer<typeof formSchema>;

type TaskFormProps = {
  task?: Task;
};

export default function TaskForm({ task }: TaskFormProps) {
  const [user] = useAuthState(auth);
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (task) {
      setValue("taskName", task.name);
      const formattedDeadline = new Date(task.deadline).toISOString().split("T")[0];
      setValue("deadline", formattedDeadline);
    }
  }, [task, setValue]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!user) {
        toast.error("ログインしてください");
        return;
      }
      try {
        if (task) {
          await updateTask({
            id: task.id,
            name: data.taskName,
            deadline: new Date(data.deadline),
            completed: task.completed,
            userId: user.uid,
            isDeleted: task.isDeleted,
          });
          toast.success("タスクを更新しました");
          router.push("/tasks");
        } else {
          await createTask({
            name: data.taskName,
            deadline: data.deadline,
            userId: user.uid,
            isDeleted: false,
          });
          toast.success("タスクを作成しました");
          router.push("/tasks");
        }
      } catch (error) {
        console.error(error);
        if (task) {
          toast.error("タスクの更新に失敗しました");
        } else {
          toast.error("タスクの作成に失敗しました");
        }
      }
    },
    [createTask, user, router, updateTask, task]
  );

  return (
    <div>
      <h2 className="text-black text-2xl font-bold">{task ? "タスク編集" : "タスク作成"}</h2>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-5">
            <div className="grid gap-y-1.5">
              <label htmlFor="taskName" className="text-black text-base font-semibold">
                Task name
              </label>
              <input
                {...register("taskName")}
                type="text"
                id="taskName"
                placeholder="New  feature implementation"
                className="block bg-[#F0F2F5] p-4 text-base rounded-md w-full max-w-[448px]"
              />
              {errors.taskName && <p className="mt-1 text-sm text-red-500">{errors.taskName.message}</p>}
            </div>

            <div>
              <label htmlFor="deadline" className="text-black text-base font-semibold">
                Due Date
              </label>
              <input
                {...register("deadline")}
                type="date"
                id="deadline"
                placeholder="Enter  a date"
                className="block bg-[#F0F2F5] p-4 text-base rounded-md w-full max-w-[448px]"
              />
              {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[113px] bg-[#2E87E5] text-white text-sm font-semibold h-10 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {task ? "Update task" : "Create task"}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <div>
            {task && (
              <button
                onClick={async () => {
                  if (confirm("このタスクを削除しますか？")) {
                    try {
                      await updateTask({
                        id: task.id,
                        isDeleted: true,
                        userId: task.userId,
                        completed: task.completed,
                      });
                      toast.success("タスクを削除しました");
                      router.push("/tasks");
                    } catch (error) {
                      console.error(error);
                      toast.error("タスクの削除に失敗しました");
                    }
                  }
                }}
                className="bg-red-500 text-white text-sm font-semibold h-10 rounded-xl px-4 hover:bg-red-600"
              >
                削除
              </button>
            )}
          </div>
          <div className="mt-10">
            {task && (
              <button
                onClick={router.back}
                className="bg-buttonBg rounded-xl w-[113px] h-10 text-sm text-black font-semibold hover:underline"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
