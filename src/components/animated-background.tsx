"use client";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";
gsap.registerPlugin(ScrollTrigger);
const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [splineApp, setSplineApp] = useState<Application>();
  const [mounted, setMounted] = useState(false);
  const selectedSkillRef = useRef<Skill | null>(null);
  const { playPressSound, playReleaseSound } = useSounds();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const animationRunIdRef = useRef(0);
  const keyboardRevealRunIdRef = useRef(0);
  const bongoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const keycapCleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const bongoAnimationRef = useRef<{
    start: () => void;
    stop: () => void;
  }>();
  const keycapAnimationsRef = useRef<{
    start: () => void;
    stop: () => void;
  }>();
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const isDarkTheme = resolvedTheme !== "light";
  const handleMouseHover = useCallback((e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;
    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (
        !selectedSkillRef.current ||
        selectedSkillRef.current.name !== e.target.name
      ) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  }, [playPressSound, playReleaseSound, splineApp]);
  const handleSplineInteractions = useCallback(() => {
    if (!splineApp) return;
    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };
    const handleKeyUp = () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    };
    const handleKeyDown = (e: SplineEvent) => {
      if (!splineApp || isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    };
    splineApp.addEventListener("keyUp", handleKeyUp);
    splineApp.addEventListener("keyDown", handleKeyDown);
    splineApp.addEventListener("mouseHover", handleMouseHover);
    return () => {
      splineApp.removeEventListener("keyUp", handleKeyUp);
      splineApp.removeEventListener("keyDown", handleKeyDown);
      splineApp.removeEventListener("mouseHover", handleMouseHover);
    };
  }, [handleMouseHover, playPressSound, playReleaseSound, splineApp]);
  const createSectionTimeline = useCallback((
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom",
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    return gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  }, [isMobile, splineApp]);
  const setupScrollAnimations = useCallback(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);
    return [
      createSectionTimeline("#skills", "skills", "hero"),
      createSectionTimeline("#projects", "projects", "skills", "top 70%"),
      createSectionTimeline("#contact", "contact", "projects", "top 30%"),
    ].filter((timeline): timeline is gsap.core.Timeline => Boolean(timeline));
  }, [createSectionTimeline, isMobile, splineApp]);
  const getBongoAnimation = useCallback(() => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");
    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => {}, stop: () => {} };
    }
    const start = () => {
      if (bongoIntervalRef.current) {
        clearInterval(bongoIntervalRef.current);
      }
      let i = 0;
      framesParent.visible = true;
      frame1.visible = true;
      frame2.visible = false;
      bongoIntervalRef.current = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      if (bongoIntervalRef.current) {
        clearInterval(bongoIntervalRef.current);
        bongoIntervalRef.current = null;
      }
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  }, [splineApp]);
  const getKeycapsAnimation = useCallback(() => {
    if (!splineApp) return { start: () => {}, stop: () => {} };
    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());
    const start = () => {
      if (keycapCleanupTimeoutRef.current) {
        clearTimeout(keycapCleanupTimeoutRef.current);
        keycapCleanupTimeoutRef.current = null;
      }
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };
    const stop = () => {
      if (keycapCleanupTimeoutRef.current) {
        clearTimeout(keycapCleanupTimeoutRef.current);
        keycapCleanupTimeoutRef.current = null;
      }
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      keycapCleanupTimeoutRef.current = setTimeout(() => {
        removePrevTweens();
        keycapCleanupTimeoutRef.current = null;
      }, 1000);
    };
    return { start, stop };
  }, [splineApp]);
  const updateKeyboardTransform = useCallback(async () => {
    if (!splineApp) return;
    const runId = ++keyboardRevealRunIdRef.current;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    kbd.visible = false;
    await sleep(400);
    if (keyboardRevealRunIdRef.current !== runId) return;
    kbd.visible = true;
    setKeyboardRevealed(true);
    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      },
    );
    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    await sleep(900);
    if (keyboardRevealRunIdRef.current !== runId) return;
    if (isMobile) {
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile",
      );
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = true;
      });
    } else {
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop",
      );
      for (let idx = 0; idx < desktopKeyCaps.length; idx += 1) {
        const keycap = desktopKeyCaps[idx];
        await sleep(idx === 0 ? 0 : 70);
        if (keyboardRevealRunIdRef.current !== runId) return;
        keycap.visible = true;
      }
    }
    for (let idx = 0; idx < keycaps.length; idx += 1) {
      const keycap = keycaps[idx];
      keycap.visible = false;
      await sleep(idx === 0 ? 0 : 70);
      if (keyboardRevealRunIdRef.current !== runId) return;
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" },
      );
    }
  }, [activeSection, isMobile, splineApp]);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!splineApp) return;
    const cleanupSplineInteractions = handleSplineInteractions();
    const scrollTimelines = setupScrollAnimations() || [];
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      cleanupSplineInteractions?.();
      scrollTimelines.forEach((timeline) => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      });
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
    };
  }, [
    getBongoAnimation,
    getKeycapsAnimation,
    handleSplineInteractions,
    isMobile,
    setupScrollAnimations,
    splineApp,
  ]);
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");
    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )
      return;
    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean,
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };
    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (isDarkTheme) {
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    } else {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    }
  }, [isDarkTheme, splineApp, isMobile, activeSection]);
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);
  useEffect(() => {
    if (!splineApp) return;
    const runId = ++animationRunIdRef.current;
    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;
    const kbd = splineApp.findObjectByName("keyboard");
    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true,
      });
      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        },
      );
    }
    const isCurrentRun = () => animationRunIdRef.current === runId;
    const manageAnimations = async () => {
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
      if (!isCurrentRun()) return;
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }
      if (activeSection === "projects") {
        await sleep(300);
        if (!isCurrentRun()) return;
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        if (!isCurrentRun()) return;
        bongoAnimationRef.current?.stop();
      }
      if (activeSection === "contact") {
        await sleep(600);
        if (!isCurrentRun()) return;
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        if (!isCurrentRun()) return;
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };
    void manageAnimations();
    return () => {
      animationRunIdRef.current += 1;
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);
  useEffect(() => {
    const hash = activeSection === "hero" ? "" : `#${activeSection}`;
    const nextUrl = `${window.location.pathname}${hash}`;
    const currentUrl = `${window.location.pathname}${window.location.hash}`;
    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
    if (!splineApp || isLoading || keyboardRevealed) return;
    void updateKeyboardTransform();
  }, [
    activeSection,
    isLoading,
    keyboardRevealed,
    splineApp,
    updateKeyboardTransform,
  ]);
  if (!mounted) {
    return <div className="fixed inset-0 bg-slate-100 dark:bg-transparent" />;
  }
  return (
    <Suspense fallback={null}>
      <Spline
        className="fixed z-[1] h-full w-full"
        onLoad={(app: Application) => {
          setSplineApp(app);
          bypassLoading();
        }}
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};
export default AnimatedBackground;
