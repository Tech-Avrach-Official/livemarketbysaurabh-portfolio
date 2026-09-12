"use client";

import { useSyncExternalStore } from "react";
import { getTheme, getServerTheme, subscribe, type Theme } from "./theme";

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme);
}
