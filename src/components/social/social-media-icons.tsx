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
    <div className="z-10 flex items-center gap-1">
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
              "rounded-full text-foreground/75 hover:bg-background/70 hover:text-foreground",
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        );
      })}
    </div>
  );
}

export default SocialMediaButtons;
