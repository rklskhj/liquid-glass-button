"use client";

import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent, PointerEvent } from "react";

export type GlassStyle = CSSProperties & { [key: `--lg-${string}`]: string | number };
export type GlassButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> & {
  variant?: "aurora" | "chrome" | "prism" | "smoke";
  size?: "sm" | "md" | "lg";
  /** Continuous material movement. Otherwise it moves on hover/loading only. */
  animate?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  /** Supply aria-label when the content is an icon. */
  iconOnly?: boolean;
  fullWidth?: boolean;
  style?: GlassStyle;
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton({
    children, variant = "aurora", size = "md", animate = false,
    loading = false, loadingLabel, iconOnly = false, fullWidth = false,
    disabled, type = "button", className = "", style,
    onPointerMove, onPointerLeave, onClick, ...props
  }, ref) {
    const [ripple, setRipple] = useState<{ x: number; y: number; size: number; id: number } | null>(null);

    function move(event: PointerEvent<HTMLButtonElement>) {
      onPointerMove?.(event);
      if (event.defaultPrevented || disabled || loading || event.pointerType !== "mouse") return;
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      button.style.setProperty("--lg-x", `${x * 100}%`);
      button.style.setProperty("--lg-y", `${y * 100}%`);
      button.style.setProperty("--lg-rx", `${(0.5 - y) * 7}deg`);
      button.style.setProperty("--lg-ry", `${(x - 0.5) * 9}deg`);
    }

    function leave(event: PointerEvent<HTMLButtonElement>) {
      onPointerLeave?.(event);
      for (const name of ["--lg-x", "--lg-y", "--lg-rx", "--lg-ry"] as const) {
        const original = style?.[name];
        if (original != null) event.currentTarget.style.setProperty(name, String(original));
        else event.currentTarget.style.removeProperty(name);
      }
    }

    function click(event: MouseEvent<HTMLButtonElement>) {
      if (disabled || loading) return;
      onClick?.(event);
      if (event.defaultPrevented || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      // Keyboard and assistive-technology clicks begin at the center.
      const x = event.detail === 0 ? rect.width / 2 : event.clientX - rect.left;
      const y = event.detail === 0 ? rect.height / 2 : event.clientY - rect.top;
      const size = Math.hypot(rect.width, rect.height) * 2;
      setRipple(previous => ({ x, y, size, id: (previous?.id ?? 0) + 1 }));
    }

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={`lg-button ${className}`.trim()}
        style={style}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-variant={variant}
        data-size={size}
        data-animate={animate}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-full-width={fullWidth}
        onPointerMove={move}
        onPointerLeave={leave}
        onClick={click}
      >
        <span className="lg-button__material" aria-hidden="true" />
        <span className="lg-button__shine" aria-hidden="true" />
        {ripple && (
          <span
            key={ripple.id}
            className="lg-button__ripple"
            aria-hidden="true"
            style={{
              "--lg-ripple-x": `${ripple.x}px`,
              "--lg-ripple-y": `${ripple.y}px`,
              "--lg-ripple-size": `${ripple.size}px`,
            } as GlassStyle}
            onAnimationEnd={() => setRipple(null)}
          />
        )}
        <span className="lg-button__label">{loading && loadingLabel ? loadingLabel : children}</span>
      </button>
    );
  }
);
