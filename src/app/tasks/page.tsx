import Spinner from "@/app/_components/spinner";
import TaskLists from "@/app/tasks/_components/task-lists";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: Promise<{ filter?: string; sort?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const sort = resolvedSearchParams.sort || "asc";
  const filter = resolvedSearchParams.filter || "all";
  return (
    <main>
      <div className="w-11/12 max-w-[960px] mx-auto py-5 mb-20">
        <h2 className="text-black text-2xl font-bold">タスク一覧</h2>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-10">
                <Spinner />
              </div>
            }
          >
            <TaskLists filter={filter} sort={sort} />
          </Suspense>
        </div>
        <div>
          <Link
            href="/task/new"
            className="text-sm text-black text-center font-bold bg-buttonBg rounded-lg h-10 flex items-center justify-center max-w-[480px] mt-10"
          >
            Add task
          </Link>
        </div>
      </div>
    </main>
  );
}
