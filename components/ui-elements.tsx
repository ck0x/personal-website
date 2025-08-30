"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";

// Animation variants
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay = 0
) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Section wrapper
interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
}

export function Section({
  children,
  id,
  className,
  innerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // Reduced base vertical spacing for mobile; scale up progressively
        "py-12 sm:py-16 md:py-24 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          // Add explicit horizontal padding for very small screens to avoid cramped layout
          "container px-4 sm:px-6 md:px-8 relative z-10",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

// Heading component with animation
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
  animated?: boolean;
}

export function Heading({
  children,
  as: Component = "h2",
  size = "3xl",
  className,
  animated = true,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    xl: "text-xl font-semibold",
    "2xl": "text-2xl font-semibold",
    "3xl": "text-3xl font-bold",
    "4xl": "text-3xl md:text-4xl font-bold",
    "5xl": "text-4xl md:text-5xl font-bold",
    "6xl": "text-5xl md:text-6xl font-bold",
  };

  const content = (
    <Component className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Component>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeIn("up")}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Animated text paragraph
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  delay?: number;
}

export function Text({
  children,
  className,
  animated = true,
  delay = 0,
  ...props
}: TextProps) {
  const content = (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeIn("up", delay)}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Updated Glass card variants to handle theming consistently
const glassCardVariants = cva(
  "rounded-xl backdrop-blur-md border shadow-xl relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-white/5 border-white/10 dark:bg-black/20 dark:border-white/10",
        dark: "bg-black/20 border-white/10",
        colored: "bg-primary/10 border-primary/20",
        light:
          "bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        scale: "hover:scale-[1.02]",
        glow: "hover:shadow-[0_0_15px_rgba(var(--primary)/0.5)]",
        border: "hover:border-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "none",
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  animated?: boolean;
  delay?: number;
}

// Update the GlassCard component to properly handle theme changes
export function GlassCard({
  children,
  className,
  variant,
  size,
  hover,
  animated = true,
  delay = 0,
  ...props
}: GlassCardProps) {
  // Remove theme detection from render function
  const content = (
    <div
      className={cn(glassCardVariants({ variant, size, hover, className }))}
      {...props}
    >
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeIn("up", delay)}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Gradient background
export function GradientBackground({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 opacity-30 pointer-events-none overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute -top-[50%] -left-[25%] w-[150%] h-[150%] rounded-full blur-3xl",
          isDark
            ? "bg-gradient-to-tr from-primary/40 via-transparent to-transparent"
            : "bg-gradient-to-tr from-primary/30 via-transparent to-transparent"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-[50%] -right-[25%] w-[150%] h-[150%] rounded-full blur-3xl",
          isDark
            ? "bg-gradient-to-bl from-primary/40 via-transparent to-transparent"
            : "bg-gradient-to-bl from-primary/30 via-transparent to-transparent"
        )}
      />
    </div>
  );
}

// Animated container for staggered children animations
export function AnimatedContainer({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated item for use within AnimatedContainer
export function AnimatedItem({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  [key: string]: any;
}) {
  return (
    <motion.div
      variants={fadeIn(direction, delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
