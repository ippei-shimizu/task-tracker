import TaskItem from "@/app/tasks/_components/task-item";
import { getTasks } from "@/services/getTasks";

export default async function TaskLists() {
  const tasks = await getTasks();

  return (
    <div className="grid gap-y-6">
      {tasks.length === 0 ? <p>タスクがありません</p> : tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
}
