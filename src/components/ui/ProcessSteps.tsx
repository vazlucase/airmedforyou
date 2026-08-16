import { Reveal } from "@/components/ui/Reveal";

interface Step {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const rows: Step[][] = [];
  for (let i = 0; i < steps.length; i += 3) {
    rows.push(steps.slice(i, i + 3));
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {rowIndex > 0 ? (
            <div
              className="mx-auto my-14 hidden w-[904px] max-w-full bg-hairline-strong lg:block"
              style={{ height: "1px" }}
            />
          ) : null}
          <div className="grid grid-cols-1 gap-x-20 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {row.map((step, i) => {
              const StepIcon = step.icon;
              const number = rowIndex * 3 + i + 1;
              return (
                <Reveal key={step.title} delay={(rowIndex + i) * 0.07}>
                  <div className="flex flex-col gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-white">
                      <StepIcon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-ink">
                      {number}. {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
