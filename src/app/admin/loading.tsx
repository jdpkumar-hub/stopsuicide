import { CardGridSkeleton } from "@/components/admin/Skeletons";

export default function AdminLoading() {
  return (
    <div>
      <div className="mb-6 h-10 w-48 animate-pulse rounded-2xl bg-black/5 dark:bg-white/10" />
      <CardGridSkeleton />
    </div>
  );
}
