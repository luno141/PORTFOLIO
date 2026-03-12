"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const AnimatedBackground = dynamic(
  () => import("@/components/animated-background"),
  {
    ssr: false,
    loading: () => null,
  },
);
export default function BackgroundLoader() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const start = () => setIsReady(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(start, { timeout: 400 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }
    const timeoutId = window.setTimeout(start, 120);
    return () => window.clearTimeout(timeoutId);
  }, []);
  if (!isReady) {
    return null;
  }
  return <AnimatedBackground />;
}
