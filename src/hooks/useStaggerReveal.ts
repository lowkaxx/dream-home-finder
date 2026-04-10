import { useEffect, useRef, useState } from "react";

export function useStaggerReveal(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasRevealedRef.current) return;

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- itemCount dependency removed to prevent state reset

  return { containerRef, visibleItems };
}
