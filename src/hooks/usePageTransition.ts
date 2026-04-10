import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type Direction = "left" | "right" | "none";

export function usePageTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionClass, setTransitionClass] = useState("page-enter-active");
  const prevPath = useRef(location.pathname);

  // Ordered routes for directional slide
  const routeOrder = ["/", "/imoveis", "/sobre", "/depoimentos", "/contato"];

  useEffect(() => {
    if (location.pathname === prevPath.current) return;

    const prevIndex = routeOrder.indexOf(prevPath.current);
    const nextIndex = routeOrder.indexOf(location.pathname);

    let dir: Direction = "none";
    if (prevIndex !== -1 && nextIndex !== -1) {
      dir = nextIndex > prevIndex ? "right" : "left";
    } else {
      dir = "right";
    }

    const exitClass = dir === "right" ? "page-exit-left" : "page-exit-right";
    setTransitionClass(exitClass);

    const timeout = setTimeout(() => {
      prevPath.current = location.pathname;
      setDisplayLocation(location);
      const enterClass = dir === "right" ? "page-enter-right" : "page-enter-left";
      setTransitionClass(enterClass);

      requestAnimationFrame(() => {
        setTimeout(() => setTransitionClass("page-enter-active"), 20);
      });
    }, 280);

    return () => clearTimeout(timeout);
  }, [location]);

  return { displayLocation, transitionClass };
}
