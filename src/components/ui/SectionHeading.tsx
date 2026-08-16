import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance max-w-2xl font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
