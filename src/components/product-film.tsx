"use client";

import { useEffect, useRef, useState } from "react";
import { useExperienceMotion } from "@/components/experience-motion";

/** Real product footage; never downloaded when reduced motion or data saving is enabled. */
export function ProductFilm({
  src,
  className = "",
  onReady,
}: {
  src: string;
  className?: string;
  onReady?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { enabled } = useExperienceMotion();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mountedSrc, setMountedSrc] = useState<string>();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const play = () => {
      if (
        enabled &&
        visible &&
        !document.hidden &&
        !connection?.saveData &&
        !failed
      ) {
        setMountedSrc(src);
        if (mountedSrc === src) void video.play().catch(() => {});
      } else video.pause();
    };
    play();
    document.addEventListener("visibilitychange", play);
    return () => {
      video.pause();
      document.removeEventListener("visibilitychange", play);
    };
  }, [enabled, visible, src, failed, mountedSrc]);
  return (
    <video
      ref={ref}
      className={`product-film ${className}`}
      data-ready={ready && !failed}
      src={mountedSrc}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onError={() => setFailed(true)}
      onCanPlay={() => {
        setReady(true);
        onReady?.();
        if (enabled && visible && !document.hidden)
          void ref.current?.play().catch(() => {});
      }}
    />
  );
}
