import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const BUTTONS = [
  {
    name: "GitHub",
    href: config.social.github,
    icon: SiGithub,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: SiLinkedin,
  },
  {
    name: "Twitter",
    href: config.social.twitter,
    icon: SiX,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: SiInstagram,
  },
];

function SocialMediaButtons() {
  const visibleButtons = BUTTONS.filter((button) => Boolean(button.href));

  return (
    <div className="relative z-[7] flex items-center gap-2">
      {visibleButtons.map((button) => {
        const Icon = button.icon;

        return (
          <a
            key={button.name}
            href={button.href}
            target="_blank"
            rel="noreferrer"
            aria-label={button.name}
            title={button.name}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "cursor-can-hover pointer-events-auto h-11 w-11 rounded-full border border-border/70 bg-background/70 text-foreground/80 shadow-[0_10px_25px_-18px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:text-foreground dark:bg-black/30 dark:hover:bg-black/45",
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}

export default SocialMediaButtons;
