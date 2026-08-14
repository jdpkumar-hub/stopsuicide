import { Card } from "@/components/ui/primitives";
import { analyticsSnapshot } from "@/lib/data/seed";

export default function AnalyticsPage() {
  const max = Math.max(...analyticsSnapshot.weekly.map((item) => item.views));

  return (
    <div>
      <h1 className="font-serif text-4xl">Analytics</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Visitors", analyticsSnapshot.visitors],
          ["Video views", analyticsSnapshot.videoViews],
          ["Stories read", analyticsSnapshot.storiesRead],
          ["Newsletter", analyticsSnapshot.newsletterSignups],
        ].map(([label, value]) => (
          <Card key={String(label)} className="p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 font-serif text-3xl">
              {Number(value).toLocaleString("en-IN")}
            </p>
          </Card>
        ))}
      </div>
      <Card className="mt-8 p-6">
        <h2 className="font-semibold">Weekly video views</h2>
        <div className="mt-6 flex h-48 items-end gap-3">
          {analyticsSnapshot.weekly.map((item) => (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-2xl bg-gradient-to-t from-hope-blue to-hope-green"
                style={{ height: `${(item.views / max) * 100}%` }}
                title={`${item.views} views`}
              />
              <span className="text-xs text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
