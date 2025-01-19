"use client";

import { useCreateTask } from "@/hooks/api/use-create-task";
import { auth } from "@/hooks/use-google-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  taskName: z.string().min(1, { message: "タスク名を入力してください" }),
  deadline: z.string().min(1, { message: "締め切りを入力してください" }),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateTaskForm() {
  const [user] = useAuthState(auth);
  const { createTask } = useCreateTask();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await createTask({
          name: data.taskName,
          deadline: data.deadline,
          completed: false,
          userId: user?.uid ?? "",
        });
        toast.success("タスクを作成しました");
        router.push("/tasks");
      } catch (error) {
        console.error(error);
        toast.error("タスクの作成に失敗しました");
      }
    },
    [createTask, user, router]
  );

  return (
    <div>
      <h2 className="text-black text-2xl font-bold">タスク作成</h2>
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
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
