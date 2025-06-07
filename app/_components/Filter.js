"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  { label: "All", value: "all" },
  { label: "1—3 guests", value: "small" },
  { label: "4—7 guests", value: "medium" },
  { label: "8—12 guests", value: "large" },
];

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("capacity");
    } else {
      params.set("capacity", filter);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='border border-primary-800 flex'>
      {filters.map(({ label, value }) => (
        <button
          disabled={activeFilter === value}
          key={value}
          onClick={() => handleFilter(value)}
          className={`cursor-pointer disabled:cursor-auto px-5 py-2 hover:bg-primary-700 ${
            activeFilter === value ? "bg-primary-700 text-white" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
