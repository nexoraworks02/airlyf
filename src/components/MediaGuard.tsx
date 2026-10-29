"use client";

import { useEffect } from "react";

const MEDIA = "img, video, picture, canvas, svg image";

/**
 * Discourages saving the site's photos and videos: no right-click menu
 * ("Save image as…") and no dragging them out to the desktop. Text, links
 * and the rest of the page keep their normal right-click. (Long-press save on
 * phones is switched off in globals.css.) Anything shown in a browser can still
 * be screenshotted, so this stops casual copying, not a determined person.
 */
export function MediaGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if (e.target instanceof Element && e.target.closest(MEDIA)) e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);
  return null;
}
