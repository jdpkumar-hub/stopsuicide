export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="h-11 animate-pulse rounded-2xl bg-black/5 dark:bg-white/10" />
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-2xl bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

export function CardGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-3xl bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-14 animate-pulse rounded-2xl bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}
