import { useRef, useLayoutEffect } from "react";

export function usePaintAnchor(callback) {
  const fired = useRef(false);

  useLayoutEffect(() => {
    if (fired.current) return;
    fired.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback(performance.now());
      });
    });
  }, [callback]);
}
