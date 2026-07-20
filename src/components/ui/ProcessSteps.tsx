import { Reveal } from "@/components/ui/Reveal";

export interface ProcessStep {
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative flex flex-col gap-8 sm:gap-10">
      <div className="absolute bottom-6 left-[19px] top-6 hidden w-px bg-ink-500/10 sm:block" aria-hidden />
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08} as="li">
          <div className="relative flex gap-5">
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-500 font-mono text-sm font-medium text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5">
              <h3 className="text-[1.05rem] font-semibold text-ink-500">{step.title}</h3>
              <p className="text-pretty mt-1.5 max-w-lg text-sm leading-relaxed text-ink-400">
                {step.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
