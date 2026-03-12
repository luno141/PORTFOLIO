"use client";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";
interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}
function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      lenis?.stop();
      lenis?.start();
    });
  }, []);
  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        prevent: (node) => {
          if (isInsideModal) return true;
          if (!(node instanceof HTMLElement)) return false;
          return Boolean(
            node.closest("[data-lenis-prevent]") ||
              node.classList.contains("modall"),
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
export default SmoothScroll;
