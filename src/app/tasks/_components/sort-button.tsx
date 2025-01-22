"use client";

import { useRouter } from "next/navigation";

type SortButtonProps = {
  filter: string;
  sort: string;
};

export default function SortButton({ filter, sort }: SortButtonProps) {
  const router = useRouter();
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`?filter=${filter}&sort=${e.target.value}`);
  };
  return (
    <div>
      <select onChange={handleSortChange} defaultValue={sort} className="text-sm px-4 py-1 rounded bg-gray-200">
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </select>
    </div>
  );
}
