import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Scroll-reveal primitives. Plain server components: they only add the data attributes that <RevealObserver>
 * (Motion.tsx, mounted once in each layout) and globals.css act on. The same attributes can be put on any existing
 * element, so adopting them never adds DOM or changes a layout.
 */

interface RevealOnScrollProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. */
  as?: ElementType;
  /** "rise" fades and rises 24px; "fade" fades only (use it for large photographs). */
  variant?: "rise" | "fade";
  /** Extra delay in milliseconds, for sequencing a few separate elements. Prefer <StaggerContainer> for a group. */
  delay?: number;
  children?: ReactNode;
}

/** One element that fades in (and rises) once, as it scrolls into view. */
export function RevealOnScroll({ as: Tag = "div", variant = "rise", delay, style, children, ...rest }: RevealOnScrollProps) {
  const css = delay ? ({ ...style, "--ds-reveal-delay": `${delay}ms` } as CSSProperties) : style;
  return (
    <Tag data-reveal={variant === "fade" ? "fade" : ""} style={css} {...rest}>
      {children}
    </Tag>
  );
}

interface StaggerContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

/**
 * A group whose direct children reveal one after another (100ms apart, capped at eight steps) when the group
 * scrolls into view: a heading then its paragraph then its action, or a row of cards. Children keep their own layout.
 */
export function StaggerContainer({ as: Tag = "div", children, ...rest }: StaggerContainerProps) {
  return (
    <Tag data-stagger="" {...rest}>
      {children}
    </Tag>
  );
}
