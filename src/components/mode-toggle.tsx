"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle({ label = "Сменить тему" }: { label?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <SunIcon className="theme-toggle__sun" aria-hidden="true" />
      <MoonIcon className="theme-toggle__moon" aria-hidden="true" />
    </button>
  );
}
