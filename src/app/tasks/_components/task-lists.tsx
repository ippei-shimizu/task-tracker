import FilteringTabs from "@/app/tasks/_components/filtering-tabs";
import SortButton from "@/app/tasks/_components/sort-button";
import TaskItem from "@/app/tasks/_components/task-item";
import { getTasks } from "@/services/getTasks";

type TaskListsProps = {
  filter: string;
  sort: string;
};

export default async function TaskLists({ filter, sort }: TaskListsProps) {
  const tasks = await getTasks(filter, sort);

  return (
    <div className="grid gap-y-6">
      <div className="flex justify-between items-center mb-4">
        <FilteringTabs filter={filter} sort={sort} />
        <SortButton filter={filter} sort={sort} />
      </div>
      {tasks.length === 0 ? <p>タスクがありません</p> : tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
}
