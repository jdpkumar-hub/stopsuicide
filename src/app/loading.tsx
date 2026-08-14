export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20" aria-live="polite" aria-busy="true">
      <div className="h-10 w-48 animate-pulse rounded-full bg-white/60 dark:bg-white/10" />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-3xl bg-white/60 dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
