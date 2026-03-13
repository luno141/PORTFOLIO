"use client";
import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { config } from "@/data/config";
const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} color={"#fff"} />,
  },
  {
    name: "Twitter",
    href: config.social.twitter,
    icon: <SiX size={"24"} color={"#fff"} />,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} color={"#fff"} />,
  },
];
const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  const visibleButtons = BUTTONS.filter((button) => Boolean(button.href));
  return (
    <div ref={ref} className="z-10 flex items-center gap-1">
      {show &&
        visibleButtons.map((button) => (
          <Button asChild variant="ghost" size="icon" key={button.name}>
            <a
              href={button.href}
              target="_blank"
              rel="noreferrer"
              aria-label={button.name}
              title={button.name}
            >
              {button.icon}
            </a>
          </Button>
        ))}
    </div>
  );
};
export default SocialMediaButtons;
