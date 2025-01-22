import Link from "next/link";

export default function FilteringTabs({ filter }: { filter: string }) {
  return (
    <div className="flex gap-4 mb-4">
      <Link
        href="?filter=all"
        className={`text-sm px-4 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        All
      </Link>
      <Link
        href="?filter=completed"
        className={`text-sm px-4 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        完了済み
      </Link>
      <Link
        href="?filter=incomplete"
        className={`text-sm px-4 py-1 rounded ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        未完了
      </Link>
    </div>
  );
}
