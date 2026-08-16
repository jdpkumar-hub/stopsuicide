import { Badge } from "@/components/ui/primitives";
import { ROLE_LABEL } from "@/lib/cms/roles";
import type { AdminRole, ContentStatus, StoryModeration } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
  draft: "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200",
  pending: "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200",
  archived: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  rejected: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-200",
};

export function StatusBadge({
  status,
}: {
  status: ContentStatus | StoryModeration | string;
}) {
  return (
    <Badge className={STATUS_CLASS[status] || undefined}>
      {status}
    </Badge>
  );
}

export function RoleBadge({ role }: { role: AdminRole }) {
  return <Badge>{ROLE_LABEL[role]}</Badge>;
}
