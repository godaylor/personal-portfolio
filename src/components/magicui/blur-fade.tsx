"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.45,
  delay = 0,
  yOffset = 8,
  inView = false,
  inViewMargin = "-50px",
}: BlurFadeProps) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inViewResult = useInView(ref, {
    once: true,
    ...(inViewMargin ? { margin: inViewMargin as never } : {}),
  });
  const isInView = !inView || inViewResult;

  if (reduceMotion) {
    return <div className={cn("blur-fade", className)}>{children}</div>;
  }

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant || defaultVariants}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("blur-fade", className)}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
