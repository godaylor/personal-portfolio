"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Pause, Play } from "lucide-react";
import { translate, type Locale } from "@/lib/i18n";

const subscribe = (callback: () => void) => {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReduced = () => false;
const MotionContext = createContext({
  enabled: false,
  reduced: false,
  paused: false,
  toggle: () => {},
});

export function ExperienceMotion({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);
  const [paused, setPaused] = useState(false);
  const enabled = !paused && !reduced;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "running" : "paused";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [enabled]);
  const value = useMemo(
    () => ({
      enabled,
      reduced,
      paused,
      toggle: () => setPaused((value) => !value),
    }),
    [enabled, reduced, paused],
  );
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}
export const useExperienceMotion = () => useContext(MotionContext);
export function MotionToggle({ locale }: { locale: Locale }) {
  const { enabled, reduced, toggle } = useExperienceMotion();
  const label = reduced
    ? translate(
        locale,
        "Анимации отключены в настройках устройства",
        "Motion is disabled in device settings",
      )
    : enabled
      ? translate(locale, "Остановить анимацию", "Pause animation")
      : translate(locale, "Включить анимацию", "Resume animation");
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggle}
      disabled={reduced}
      aria-label={label}
      title={label}
      aria-pressed={!enabled}
    >
      {enabled ? <Pause size={15} /> : <Play size={15} />}
    </button>
  );
}
