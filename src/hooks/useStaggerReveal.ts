import { useEffect, useRef, useState } from "react";

export function useStaggerReveal(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    // Reset state when itemCount changes
    setVisibleItems(new Set());
    hasRevealedRef.current = false;
  }, [itemCount]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasRevealedRef.current || itemCount === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasRevealedRef.current = true;
          // Stagger reveal each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]));
            }, i * 150);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [itemCount]);

  return { containerRef, visibleItems };
}
