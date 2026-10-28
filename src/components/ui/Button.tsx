import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Fresh-green pill with forest text — works on light or forest.
  primary: "btn-primary bg-teal-400 text-teal-800 hover:bg-teal-300",
  // Light-default outline. On forest bands pass an override className (see usages).
  secondary:
    "btn-outline bg-white text-teal-700 border-2 border-teal-600/25 hover:border-teal-600 hover:bg-teal-50",
  ghost: "text-teal-700 hover:bg-teal-50",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} target={props.target} rel={props.rel}>
        {children}
      </Link>
    );
  }

  // `rest` carries only native button attributes (onClick, type, disabled, …);
  // variant/size/className/children are already destructured out above.
  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

// Utility for a secondary button placed on a navy/dark band.
export const onDarkSecondary =
  "!bg-transparent !text-white !border-white/40 hover:!bg-white/10 hover:!border-white";
