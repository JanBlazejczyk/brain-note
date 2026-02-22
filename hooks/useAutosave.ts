"use client";

import { useCallback, useRef } from "react";
import { updateDocument } from "@/app/actions";

export function useAutosave(id: string, delay = 500) {
  const timer = useRef<NodeJS.Timeout>(null);

  const save = useCallback(
    (title: string, content: object) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        updateDocument(id, title, content);
      }, delay);
    },
    [id, delay]
  );

  return save;
}
