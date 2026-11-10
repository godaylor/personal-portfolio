"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: { hidden: { y: number }; visible: { y: number } };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
}

// Keep server-rendered content visible. Motion is a progressive enhancement,
// never a prerequisite to reading the page or a source of hydration differences.
export default function BlurFade({ children, className, variant, duration = 0.6, delay = 0, yOffset = 16, inView = false, inViewMargin = "-30px" }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let played = false;
    const play = () => {
      if (played || preference.matches || document.documentElement.dataset.motion === "paused") return;
      played = true;
      animation = element.animate([
        { opacity: 0, transform: `translateY(${variant?.hidden.y ?? yOffset}px)` },
        { opacity: 1, transform: `translateY(${variant?.visible.y ?? 0}px)` },
      ], { duration: duration * 1000, delay: delay * 1000, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
    };
    const observer = inView ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { play(); observer?.disconnect(); }
    }, { rootMargin: inViewMargin }) : null;
    if (observer) observer.observe(element); else play();
    const cancel = () => { if (preference.matches) animation?.cancel(); };
    preference.addEventListener("change", cancel);
    return () => { observer?.disconnect(); animation?.cancel(); preference.removeEventListener("change", cancel); };
  }, [delay, duration, inView, inViewMargin, variant, yOffset]);
  return <div ref={ref} className={cn("blur-fade", className)}>{children}</div>;
}
