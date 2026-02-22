import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "rgba(255,255,255,0.4)",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        style={{ background, borderRadius }}
        {...props}
      >
        {/* Shimmer sweep */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{ borderRadius }}
        >
          <span
            className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_3s_ease-in-out_infinite]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
            }}
          />
        </span>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-1">{children}</span>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
