export function lockScroll(durationMs) {
  const original = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = "hidden";

  const timer = setTimeout(() => {
    document.body.style.overflow = original;
  }, durationMs);

  return () => {
    clearTimeout(timer);
    document.body.style.overflow = original;
  };
}
