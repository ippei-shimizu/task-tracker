import TaskForm from "@/app/task/_components/task-form";

export default function Page() {
  return (
    <main>
      <div className="w-11/12 max-w-[960px] mx-auto">
        <div className="mt-14">
          <TaskForm />
        </div>
      </div>
    </main>
  );
}
