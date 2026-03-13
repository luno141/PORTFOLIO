import React from "react";
import Link from "next/link";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[6] flex w-full shrink-0 flex-col items-center gap-3 border-t border-border bg-background/55 px-4 py-6 backdrop-blur-sm sm:flex-row sm:justify-between md:px-6">
      <p className="text-xs text-muted-foreground">
        © {year} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
      {footer.length > 0 ? (
        <nav className="z-10 flex gap-4 sm:gap-6">
          {footer.map((link, index) => {
            const { title, href } = link;
            return (
              <Link
                className="text-xs underline-offset-4 hover:underline"
                href={href}
                key={`l_${index}`}
              >
                <Button variant="link">{title}</Button>
              </Link>
            );
          })}
        </nav>
      ) : null}
    </footer>
  );
}
export default Footer;
