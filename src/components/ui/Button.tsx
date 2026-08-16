import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "urgent" | "whatsapp";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong active:bg-teal-800",
  secondary:
    "bg-accent text-white hover:bg-accent-strong active:bg-teal-800",
  outline:
    "border border-hairline-strong bg-canvas text-ink hover:border-accent hover:bg-mist active:bg-mist-deep",
  ghost: "text-accent hover:bg-mist active:bg-mist-deep",
  urgent: "bg-ember-500 text-white hover:bg-ember-600 active:bg-ember-700",
  whatsapp: "whatsapp-gradient text-white hover:brightness-105 active:brightness-95",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.78rem] gap-1.5",
  md: "h-12 px-7 text-[0.85rem] gap-2",
  lg: "h-14 px-9 text-[0.9rem] gap-2.5",
};

const baseClasses =
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl font-semibold " +
  "transition-all duration-300 ease-[var(--ease-fluid)] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent";

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
