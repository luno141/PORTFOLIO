import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { BriefcaseBusiness, File, FolderKanban } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
const HeroSection = () => {
  const { isLoading } = usePreloader();
  const nameParts = config.author.split(" ");
  const firstName = nameParts[0];
  const remainingName = nameParts.slice(1).join(" ");
  const socialLinks = [
    {
      href: config.social.github,
      icon: <SiGithub size={24} />,
      label: "GitHub",
    },
    {
      href: config.social.linkedin,
      icon: <SiLinkedin size={24} />,
      label: "LinkedIn",
    },
    {
      href: config.social.instagram,
      icon: <SiInstagram size={24} />,
      label: "Instagram",
    },
  ].filter((link) => Boolean(link.href));
  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-[100svh]")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100svh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "px-6 pt-28 pb-16 sm:px-8 md:p-20 lg:p-24 xl:p-28",
          )}
        >
          {!isLoading && (
            <div className="flex flex-col">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-stone-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ",
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-[6px] leading-none font-thin text-transparent text-stone-800 text-left",
                          "font-thin text-[clamp(4.5rem,14vw,8.75rem)]",
                          "cursor-default text-edge-outline font-display ",
                        )}
                      >
                        {firstName}
                        {remainingName && <br className="md:block hiidden" />}
                        {remainingName}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      there is something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>

                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 text-stone-700 dark:text-zinc-300",
                      "cursor-default font-display text-base sm:text-lg md:text-xl max-w-xl bg-clip-text",
                    )}
                  >
                    {config.headline}
                  </p>
                </BlurIn>
                <BlurIn delay={1.4}>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-800 dark:text-zinc-200 sm:text-base">
                    {config.availability.headline}
                  </p>
                </BlurIn>
                <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
                  {config.statusHighlights.map((item) => (
                    <span
                      key={item}
                      className="surface-pill rounded-full border border-border/90 bg-background/90 px-3 py-1 text-xs text-stone-900 backdrop-blur-sm dark:text-zinc-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 w-fit">
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link href={config.resume} target="_blank" className="flex-1">
                    <BoxReveal delay={2} width="100%">
                      <Button className="flex items-center gap-2 w-full">
                        <File size={24} />
                        <p>Resume</p>
                      </Button>
                    </BoxReveal>
                  </Link>

                  <Link href="/projects" className="flex-1">
                    <BoxReveal delay={2.1} width="100%">
                      <Button className="flex items-center gap-2 w-full">
                        <FolderKanban size={20} />
                        <p>Case Studies</p>
                      </Button>
                    </BoxReveal>
                  </Link>
                </div>
                <Link href={"#contact"} className="flex-1">
                  <BoxReveal delay={2.2} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <BriefcaseBusiness size={20} />
                      <p>Discuss a Role</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <div className="flex items-center h-full gap-2">
                    {socialLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button variant={"outline"} aria-label={link.label}>
                          {link.icon}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};
export default HeroSection;
