"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useMouse } from "@/hooks/use-mouse";
import { usePreloader } from "../preloader";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";
function useTicker(callback: gsap.TickerCallback | undefined, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      if (callback) {
        gsap.ticker.remove(callback);
      }
    };
  }, [callback, paused]);
}
type SetterMap = {
  x?: Function;
  y?: Function;
  r?: Function;
  width?: Function;
  sx?: Function;
  sy?: Function;
};
function useInstance<T>(value: T | (() => T)) {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = typeof value === "function" ? (value as () => T)() : value;
  }
  return ref.current;
}
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}
function getRekt(el: HTMLElement) {
  if (el.classList.contains("cursor-can-hover"))
    return el.getBoundingClientRect();
  else if (el.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  else if (
    el.parentElement?.parentElement?.classList.contains("cursor-can-hover")
  )
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}
function runSetter(setter: Function | undefined, value: number) {
  if (setter) {
    setter(value);
  }
}
const CURSOR_DIAMETER = 50;
function ElasticCursor() {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/blogs/") && pathname !== "/blogs";
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const jellyRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { x, y } = useMouse();
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance<SetterMap>({});
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
  }, []);
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;
    var rotation = getAngle(+vel.x, +vel.y);
    var scale = getScale(+vel.x, +vel.y);
    if (!isHovering && !isLoading) {
      runSetter(set.x, pos.x);
      runSetter(set.y, pos.y);
      runSetter(set.width, 50 + scale * 300);
      runSetter(set.r, rotation);
      runSetter(set.sx, 1 + scale);
      runSetter(set.sy, 1 - scale * 2);
    } else {
      runSetter(set.r, 0);
    }
  }, [isHovering, isLoading]);
  const [cursorMoved, setCursorMoved] = useState(false);
  useLayoutEffect(() => {
    if (isMobile) return;
    const setFromEvent = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) {
        setCursorMoved(true);
      }
      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);
      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);
        gsap.to(jellyRef.current, {
          rotate: 0,
          duration: 0,
        });
        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 20,
          height: el.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
        setIsHovering(false);
      }
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(pos, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (x - pos.x) * 1.2;
          vel.y = (y - pos.y) * 1.2;
        },
      });
      loop();
    };
    if (!isLoading) window.addEventListener("mousemove", setFromEvent);
    return () => {
      if (!isLoading) window.removeEventListener("mousemove", setFromEvent);
    };
  }, [isLoading]);
  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);
  useTicker(loop, isLoading || !cursorMoved || isMobile);
  if (isMobile || isBlogPost) return null;
  return (
    <>
      <div
        ref={jellyRef}
        id={"jelly-id"}
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px] border-2 border-black dark:border-white`,
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]",
        )}
        style={{
          zIndex: 100,
          backdropFilter: "invert(100%)",
        }}
      ></div>
      <div
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none transition-none duration-300"
        style={{
          top: y,
          left: x,
          backdropFilter: "invert(100%)",
        }}
      ></div>
    </>
  );
}
export default ElasticCursor;
