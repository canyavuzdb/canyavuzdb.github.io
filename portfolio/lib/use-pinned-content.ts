"use client";

import { useCallback, useEffect, useState } from "react";

const storageKey = "portfolio:pinned-content";

export function usePinnedContent() {
  const [pinnedKeys, setPinnedKeys] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setPinnedKeys(new Set(JSON.parse(stored) as string[]));
    } catch {
      // Pinning is an optional local preference.
    }
  }, []);

  const togglePinned = useCallback((key: string) => {
    setPinnedKeys((current) => {
      const next = new Set(current);
      next.has(key) ? next.delete(key) : next.add(key);
      window.localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  return { isPinned: (key: string) => pinnedKeys.has(key), togglePinned };
}
