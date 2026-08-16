"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/primitives";

export type DataColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  searchPlaceholder = "Search…",
  searchValue,
  onSearch,
  filters,
  pageSize = 8,
  empty = "No items yet.",
}: {
  rows: T[];
  columns: DataColumn<T>[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  filters?: ReactNode;
  pageSize?: number;
  empty?: string;
}) {
  const [internalSearch, setInternalSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = searchValue ?? internalSearch;

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(event) => {
            setPage(1);
            if (onSearch) onSearch(event.target.value);
            else setInternalSearch(event.target.value);
          }}
          placeholder={searchPlaceholder}
          className="w-full rounded-2xl border border-border bg-transparent px-4 py-2.5 text-sm sm:max-w-xs"
        />
        {filters}
      </div>
      <div className="overflow-x-auto rounded-3xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-black/5 text-xs uppercase tracking-wide text-muted dark:bg-white/5">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-3 font-semibold ${column.className || ""}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length ? (
              paged.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-3 ${column.className || ""}`}>
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted">
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p>
          {rows.length} item{rows.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            Previous
          </Button>
          <span>
            {page} / {pages}
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={page >= pages}
            onClick={() => setPage((value) => Math.min(pages, value + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
