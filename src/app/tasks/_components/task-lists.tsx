import FilteringTabs from "@/app/tasks/_components/filtering-tabs";
import TaskItem from "@/app/tasks/_components/task-item";
import { getTasks } from "@/services/getTasks";

export default async function TaskLists({ searchParams }: { searchParams: { filter?: string } }) {
  const filter = searchParams.filter || "all";

  const tasks = await getTasks(filter);

  return (
    <div className="grid gap-y-6">
      <FilteringTabs filter={filter} />
      {tasks.length === 0 ? <p>タスクがありません</p> : tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
}
