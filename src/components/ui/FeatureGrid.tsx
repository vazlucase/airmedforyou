import { cn } from "@/lib/utils";

interface FeatureItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description?: string;
}

export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: FeatureItem[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4"
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className="group rounded-2xl border border-hairline bg-canvas p-8 transition-all duration-300 hover:shadow-card hover:border-hairline-strong"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent-tint text-accent transition-colors group-hover:bg-accent-soft">
            <item.icon className="size-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink">
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
              {item.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
