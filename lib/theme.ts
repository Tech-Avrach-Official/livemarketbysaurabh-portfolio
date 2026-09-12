"use client";

/* Theme lives on <html> as two attributes, exactly as it did in the vanilla
   build: data-theme records an explicit choice (absent when the visitor has
   made none) and data-resolved-theme always names what is on screen. The
   stylesheet keys its overrides off the first and the icons off the second,
   so an unset preference keeps tracking the system.

   A tiny external store rather than context: the inline script in <head> has
   already written the attributes before React boots, so the DOM — not React
   state — is the source of truth. useSyncExternalStore reads from it without
   a hydration mismatch. */

export type Theme = "light" | "dark";

const KEY = "lmbs-theme";
const listeners = new Set<() => void>();

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-resolved-theme") === "light"
    ? "light"
    : "dark";
}

export function setTheme(theme: Theme) {
  const r = document.documentElement;
  r.setAttribute("data-theme", theme);
  r.setAttribute("data-resolved-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode — the choice just won't persist */
  }
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/* Server render assumes dark so the markup matches the common case; the
   inline head script has already corrected the DOM before hydration. */
export const getServerTheme = (): Theme => "dark";

export function hasStoredChoice() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark";
  } catch {
    return false;
  }
}

/* Keep following the OS until the visitor actually picks one. */
export function followSystem() {
  if (hasStoredChoice() || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onChange = (e: MediaQueryListEvent) => {
    const r = document.documentElement;
    r.removeAttribute("data-theme");
    r.setAttribute("data-resolved-theme", e.matches ? "light" : "dark");
    listeners.forEach((l) => l());
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
