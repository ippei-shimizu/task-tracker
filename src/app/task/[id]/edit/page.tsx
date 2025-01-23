import TaskForm from "@/app/task/_components/task-form";
import { getTaskById } from "@/services/getTaskById";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const task = await getTaskById((await params).id);

  return (
    <main>
      <div className="w-11/12 max-w-[960px] mx-auto">
        <div className="mt-14">
          <TaskForm task={task} />
        </div>
      </div>
    </main>
  );
}
