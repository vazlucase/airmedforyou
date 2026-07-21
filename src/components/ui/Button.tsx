import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-red-500 text-white shadow-[var(--shadow-button)] hover:bg-red-600 active:bg-red-700",
  secondary:
    "bg-navy-600 text-white hover:bg-navy-700 active:bg-navy-800",
  outline:
    "border border-navy-200 bg-white text-navy-700 hover:border-navy-400 hover:bg-navy-50 active:bg-navy-100",
  ghost:
    "text-navy-600 hover:bg-navy-50 active:bg-navy-100",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-dark active:bg-whatsapp-dark",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

const baseClasses =
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium " +
  "transition-all duration-300 ease-[var(--ease-fluid)] active:scale-[0.96] " +
  "disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-navy-500";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
    target?: string;
    rel?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    icon,
    iconPosition = "left",
    children,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="inline-flex shrink-0 [&>svg]:size-[1.1em]">{icon}</span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="inline-flex shrink-0 [&>svg]:size-[1.1em]">{icon}</span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const href = props.href;
    const restAsAnchor = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      external?: boolean;
      href?: string;
      target?: string;
      rel?: string;
    };
    const { external, target, rel, href: _omit, ...anchorRest } = restAsAnchor;
    void _omit;
    const isExternal = external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...anchorRest}
          href={href}
        >
          {content}
        </a>
      );
    }
    return (
      <Link className={classes} {...anchorRest} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
