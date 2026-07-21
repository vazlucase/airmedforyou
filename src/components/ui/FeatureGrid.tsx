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
        "grid grid-cols-1 gap-5 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4"
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className="group rounded-2xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:shadow-card hover:border-navy-200"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-100">
            <item.icon className="size-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 text-lg font-semibold leading-snug text-navy-900 font-heading">
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-2 text-sm leading-relaxed text-granite-600">
              {item.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
